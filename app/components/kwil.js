import { BrowserProvider } from 'ethers';
import { KwilSigner, Utils, WebKwil } from '@kwilteam/kwil-js';


//Kwil SetUp --->


//Set kwil class
const kwil = new WebKwil({
    kwilProvider: "https://longhorn.kwil.com",
    chainId: "longhorn-2",
});

//Get signer function the set the signer
async function getSigner() {
    const provider = new BrowserProvider(window.ethereum);
    const ethSigner = await provider.getSigner();
    const ethAddress = await ethSigner.getAddress();

    return new KwilSigner(ethSigner, ethAddress);
}

//Wallet address and database name to get the database id from kwil
const dbid = Utils.generateDBID('0x862A7F74F130A7Aa4E3F7916159A749BB004C4b1', 'todo_dapp_tasks_db');

async function create_new_user(_address, _addid) {
    const kwilSigner = await getSigner();
    const result = kwil.execute({
        dbid,
        name: "create_new_user",
        inputs: [
            {
                $address: _address,
                $addid: _addid
            }
        ]
    }, kwilSigner);
    return result.data;
}

//DATABASE FUNCTIONS

async function add_task(_id, _description) {
    const kwilSigner = await getSigner();
    const result = await kwil.execute({
        dbid,
        name: "add_task",
        inputs: [
            {
                $id: _id,
                $description: _description
            }
        ]
    }, kwilSigner);
    return result.data;
}
async function delete_task(_id) {
    const kwilSigner = await getSigner();
    const result = await kwil.execute({
        dbid,
        name: "delete_task",
        inputs: [
            {
                $id: _id
            }
        ]
    }, kwilSigner);
    return result.data;
}
async function clear_tasks() {
    const kwilSigner = await getSigner();
    const result = await kwil.execute({
        dbid,
        name: 'clear_tasks',
        inputs: []
    }, kwilSigner);
    return result.data;
}

async function get_all_user_tasks() {
    const kwilSigner = await getSigner();
    const result = await kwil.call({
        dbid,
        name: 'get_user_all_tasks',
        inputs: []
    }, kwilSigner);
    return result.data.result;
}

export { create_new_user, add_task, delete_task, clear_tasks, get_all_user_tasks };