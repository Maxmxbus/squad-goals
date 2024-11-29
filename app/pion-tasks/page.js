import { Wallet } from 'ethers';
import '../css/pion-tasks.css'

export default function Home() {
    return (
        <div className='main'>
            <div className='info'>
                <h1 className='text-2xl'>Username: 0x92d...aff2</h1>
                <h2 className='text-xl'>Status: Pion</h2>
            </div>
            <div className='container'>

                <label className="cursor-pointer label task">
                    <input type="checkbox" className="checkbox checkbox-secondary" />
                    <span className="label-text">Remember me</span>
                </label>

            </div>


        </div>
    );
}