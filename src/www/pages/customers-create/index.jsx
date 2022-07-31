import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {
	BodyWrapper,
	Container,
	FormItemDesc,
	FormItemName,
	RedIcon,
	Required,
	Title,
	FormItem,
	Wrapper,
	FormWrapper,
} from './create-nft.elements';
import { Upload, message, Form, Input, Button, Skeleton, Select } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { client } from '../../utilities/ipfs';
import { superheroes } from '../../../declarations';
import { Principal } from '@dfinity/principal';
import { toList } from '../../utilities/idl';
import { idlFactory } from '../../../declarations/superheroes.did.js';
import { customAxios } from '../../utils/custom-axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { withContext } from '../../hooks';

const { Dragger } = Upload;
const { Option } = Select;
import { useCanister, useConnect } from '@connect2ic/react';

const IPFS_LINK = 'https://dweb.link/ipfs/';

function CreateNft(props) {
	const {
		isConnected,
		disconnect,
		activeProvider,
		isIdle,
		connect,
		isConnecting,
		principal,
	} = useConnect();
	const [fileImg, setFileImg] = useState(true);
	const [listNFt, setListNFt] = useState([]);
	const [listAllNFt, setListAllNFt] = useState([]);
	const [superheroes, { loading, error }] = useCanister('superheroes');
	const [rows, setRows] = useState([]);

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [dob, setDob] = useState('');
	const [sex, setSex] = useState('');
	const [phoneNo, setPhoneNo] = useState('');
  const [userAddress, setUserAddress] = useState("");


	function onChange(value) {
		console.log(`selected ${value}`);
	}

	function onSearch(val) {
		console.log('search:', val);
	}

	const onChangeFile = async (info) => {
		const { status } = info.file;
		console.log(info);
		message.success(`${info.file.name} file uploaded successfully.`);
		return info.file;
	};
	const requestUpdate = async (info) => {
		const resImg = await onChangeFile(info);
		setFileImg(resImg);
		info.onSuccess('okk');
	};

	useEffect(async () => {
		if (principal && superheroes) {
			getLIst();
		}
	}, [principal, superheroes]);

	const getListAll = async () => {
		console.log('SUPERHEROES_CANISTER_ID', process.env.SUPERHEROES_CANISTER_ID);
		const res = await superheroes.getAllTokens();
		console.log(res);
		const promise4all = Promise.all(
			res.map(function (el) {
				return customAxios(el.metadata[0]?.tokenUri);
			})
		);
		const resu = await promise4all;
		console.log(resu);
		setListAllNFt(resu);
	};

	const onFinish = async (values) => {
		console.log(values);
		toast('Minting NFT!!!');
		const cid = await client.put([fileImg]);
		const nFile = new File(
			[
				JSON.stringify({
					description: values?.description,
					name: values?.name,
					image: `${IPFS_LINK}${cid}/${values?.image?.file?.name}`,
				}),
			],
			`${values?.name}.json`,
			{ type: 'text/plain' }
		);
		const metadataCID = await client.put([nFile]);
		const res = await superheroes.mint(Principal.fromText(principal), [
			{ tokenUri: `${IPFS_LINK}${metadataCID}/${values?.name}.json` },
		]);
		toast('Minted NFT success!!!');
		getLIst();
		getListAll();
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	const getLIst = async () => {
		const res = await superheroes.getUserTokens(Principal.fromText(principal));
		const promise4all = Promise.all(
			res.map(function (el) {
				return customAxios(el.metadata[0]?.tokenUri);
			})
		);
		const resu = await promise4all;
		setListNFt(resu);
	};

	// const getUserInfo = async () => {
	// 	const res = await superheroes.getAll();
	// 	let row = [];
	// 	for (let i = 0; i < res.length; i++) {
	// 		row.push(
	// 			createData(
	// 				i + 1,
	// 				res[i].first_name + ' ' + res[i].last_name,
	// 				res[i].dob,
	// 				res[i].phone_number,
	// 				res[i].gender ? 'Male' : 'Female'
	// 			)
	// 		);
	// 	}
	// 	setRows(row);
	// 	console.log(res);
	// };

// {dob:text; alias:text; createTime:int; user_address:text; address:text; gender:bool; first_name:text; last_name:text; phone_number:text; avatar:text}


	async function updateData() {
		const res = await superheroes.createAccount(Principal.fromText(principal), 
      {
        "first_name": firstName,
        "last_name": lastName, 
        "dob": dob,
        "gender": sex.toLowerCase() === 'male',
        "phone_number": phoneNo,
        "user_address": userAddress,
        "alias": "",
        "avatar": "",
        "createTime": 1,
        "address": ""
      }
    );
    console.log(res);
	}

	//   const rows = [
	// 	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
	// 	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	// 	createData('Eclair', 262, 16.0, 24, 6.0),
	// 	createData('Cupcake', 305, 3.7, 67, 4.3),
	// 	createData('Gingerbread', 356, 16.0, 49, 3.9),
	//   ];

	return (
		<Container>
			<Wrapper>
				<Title>Customers Register</Title>
				<BodyWrapper>
					<TextField
						required
						id='outlined-required'
						label='First Name'
						onChange={(e) => setFirstName(e.target.value)}
					/>
					<br />
					<TextField
						required
						id='outlined-required'
						label='Last Name'
						onChange={(e) => setLastName(e.target.value)}
					/>
					<br />
					<TextField
						required
						id='outlined-required'
						label='Birthday'
						onChange={(e) => setDob(e.target.value)}
					/>
					<br />
					<TextField
						required
						id='outlined-required'
						label='Phone Number'
						onChange={(e) => setPhoneNo(e.target.value)}
					/>
					<br />
          <TextField
						required
						id='outlined-required'
						label='Address'
						onChange={(e) => setUserAddress(e.target.value)}
					/>
					<br />
					<TextField
						required
						id='outlined-required'
						label='Gender'
						onChange={(e) => setSex(e.target.value)}
					/>
					<br />
				</BodyWrapper>
        <Button onClick={() => updateData()}>Update</Button>
			</Wrapper>
		</Container>
	);
}

export default withContext(CreateNft);
