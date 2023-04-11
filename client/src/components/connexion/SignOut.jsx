import { useSignOut } from "react-auth-kit"
import { SocketContext } from '../../socket'
import { useContext } from "react"

export default function SignOut() {

    const signOut = useSignOut()

    return (
        <button className="btn-signOut" onClick={() => signOut()}>
            Déconnexion
        </button>
    )
}