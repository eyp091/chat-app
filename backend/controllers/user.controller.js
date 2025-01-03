import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggenInUserId = req.user._id;
        const fullName = req.user.fullName;
        const filteredUsers = await User.find({_id: { $ne: loggenInUserId }}).select("-password"); //login olan kullanıcı hariç tüm kullanıcıları bulur.
        
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({error: "Internal server error."});
    }
}