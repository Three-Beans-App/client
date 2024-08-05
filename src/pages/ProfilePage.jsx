import { useState, useEffect } from "react";
import { useUserData, useUserDispatch } from "../contexts/userContext";
import "../styles/pages/ProfilePage.css";

export default function ProfilePage() {
    const { user } = useUserData();
    const { updateUserDetails } = useUserDispatch();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    const handleSave = async () => {
        const result = await updateUserDetails(name, email);
        if (result.success) {
            setIsEditing(false);
        } else {
            console.log("Error updating profile:", result.message);
        }
    };

    return (
        <div id="profileContentContainer">
            <div id="profileContentBox">
                {!isEditing ? (
                    <div>
                        <h2>{name || "N/A"}</h2>
                        <p>{email || "N/A"}</p>
                        <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                    </div>
                ) : (
                    <div>
                        <label>Name:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        <label>Email:</label>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <button onClick={handleSave}>Save</button>
                    </div>
                )}
            </div>
        </div>
    );
}