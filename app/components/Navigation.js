export default function Navigation({ address }) {
    //State for the address

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl" href="/">Squad Goals</a>
            </div>
            <div className="flex-none">
                <a className="btn btn-ghost text-xl">{address ? "Wallet Address: " + address.slice(0, 6) + "...  " + address.slice(38, 42) : "Connect Wallet"}</a>
            </div>
        </div>
    )
}