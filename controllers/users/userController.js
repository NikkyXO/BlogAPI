const User = require('../../models/User/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../../utils/generateToken');
const getTokenFromHeader = require('../../utils/getTokenFromHeader');
const {appError, AppError} = require('../../utils/appError');


// Register User
const registerUser = async (req, res, next) => {
    const {firstname, lastname, email, profilePhoto, password } = req.body;
    try {
        
        const userExists = await User.findOne({email});
        if (userExists) {
            next(new AppError("User Already Exists", 400));

        } else {
            // hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // create the user
            const user = await User.create({
                firstname, 
                lastname, 
                email, 
                // profilePhoto, 
                password: hashedPassword
            });

            res.json({
                status: "success",
                data: user
            })
        }
        
    }catch (error) {
        next(appError("User Already Exists", 500));
    }
};

// Login User
const loginUser = async(req, res, next) => {
    const {email, password} = req.body;
    try {
        // Check if email exists
        const userExists = await User.findOne({ email });

        // validity of password
        const isPasswordMatched = await bcrypt.compare(
            password, 
            userExists.password
        );

        if (!userExists  || !isPasswordMatched) {
            console.log("in condition loop");
            next(new AppError("Invalid login credentials", 401));
           
        }

        res.json({
            status: "success",
            data: {
                msg: "Log in successfully",
                token: generateToken(userExists._id)
            }
        })
    }catch (error) {
        next(appError(error.message, 500));
    }
}

// user profile
const getUserById = async(req, res, next) => {
  
    const userId = req.userAuth;
    try {
        
        const userExists = await User.findById(userId);
        if (userExists) {
            return res.json({
                status: "success",
                data: userExists
            })
        }
        next(new AppError("No such user exists", 404));
    }catch (error) {
        next(appError(error.message, 500));
    }
}

const updateUserById = async(req, res, next) => {
    const userId = req.userAuth;
    const {firstname, lastname, profilePhoto } = req.body;
    const userExists = await User.findById(userId);
    try {
        if (userExists) {
            userExists.firstname = firstname ? firstname : userExists.firstname;
            userExists.lastname = lastname ? lastname : userExists.lastname;
            userExists.profilePhoto = profilePhoto ? profilePhoto : userExists.profilePhoto;

            await userExists.save();

            return res.json({
                status: "success",
                data: "profile updated"
            });
        } else {
            next(new AppError("User does not exists", 400));
            // return res.json({
            //     status: "failure",
            //     data: "User does not exists"
            // });
        }
        
    }catch (error) {
        next(appError(error.message, 500));
    }
}

const deleteUserById = async(req, res) => {
    const userId = req.userAuth;
    try {
        res.json({
            status: "success",
            data: "profile deleted"
        })
    }catch (error) {
        next(appError(error.message, 500));
    }
}

const getAllUsers = async(req, res, next) => {
    try {
        // const users = User.
        res.json({
            status: "success",
            data: "all profile data"
        })
    }catch (error) {
        next(appError(error.message, 500));
    }
}


const getViewers = async(req, res, next) => {
    try {
        const {id} = req.params;
        const originalUser = await User.findById(id);
        const userViewing = await User.findById(req.userAuth);

        if (originalUser && userViewing) {

            const isAlreadyViewed = originalUser.viewedBy.find( viewerId => 
                viewerId.toString() === userViewing._id.toJSON()
            );
            if (!isAlreadyViewed) {
                originalUser.viewedBy.push(userViewing._id);
                await originalUser.save();
                return res.json({
                    status: "success",
                    data:  `${userViewing.firstname}  viewed this`
                })
            }
            return next(appError("You have Already viewed this profile", 400))
        }
        
    }catch (error) {
        return next(appError(error.message, 500));
    }
}

// Profile Photo Upload
const uploadProfilePhoto = async(req, res, next) => {
    const userId = req.userAuth;
    console.log(req.file);

    try {
        const userExists = await User.findById(userId);
        if (!userExists) {
            return next(appError("User not Found", 404));
        }
        if (userExists.isBlocked) {
            return next(appError("action not allowed, Your Account is blocked", 401));
        }

        if (req.file) {
            console.log("path here: " ); //+ req.file.path
            await User.findByIdAndUpdate(userId, {
                $set: {
                    profilePhoto: req.file.path,
                },
            },
                {
                    new: true
                }
            );
            return res.json({
                status: "success",
                msg: "profile photo uploaded"
            });
        }
        return next(appError("Error Occured while trying to upload file", 401));

    } catch (error) {
        return next(appError(error.message, 500));
    }
    
}

const followContrl = async(req, res, next) => {
    try {

        const userWhoWantsToFollow = await User.findById(req.userAuth);
        const userWhoIsBeingFollowed = await User.findById(req.params.id);

        if (userWhoWantsToFollow && userWhoIsBeingFollowed) {

            const isUserAlreadyFollowing = userWhoWantsToFollow.following.find( followingId => 
                followingId.toString() === userWhoIsBeingFollowed._id.toJSON()
            );

            const isUserAlreadyFollowed = userWhoIsBeingFollowed.followers.find( followerId => 
                followerId.toString() ===    userWhoWantsToFollow._id.toJSON()
            );

            console.log("is following: " + isUserAlreadyFollowing);
            console.log("is followed: " + isUserAlreadyFollowed);
            if (isUserAlreadyFollowing && isUserAlreadyFollowed) {
                return next(appError("You already followed this user", 400));
            }


            userWhoIsBeingFollowed.followers.push(userWhoWantsToFollow._id);
            userWhoWantsToFollow.following.push(userWhoIsBeingFollowed._id);
            
            await userWhoIsBeingFollowed.save();
            await userWhoWantsToFollow.save();

            return res.json({
                status: "success",
                data:  `You have followed this user successfully`
            })
        }
        
    }catch (error) {
        return next(appError(error.message, 500));
    }
}


const unFollowContrl = async(req, res, next) => {
    try {

        const userWantToUnfollow = await User.findById(req.userAuth);
        const userWhoIsBeingUnFollowed = await User.findById(req.params.id);

        if ( userWantToUnfollow && userWhoIsBeingUnFollowed) {

            const ifFollowing = userWantToUnfollow.following.find( followingId =>
                followingId.toString() === userWhoIsBeingUnFollowed._id.toString()
            );
            console.log("is following" + ifFollowing);

            const ifFollowed = userWhoIsBeingUnFollowed.followers.find( followerId => 
                followerId.toString() === userWantToUnfollow._id.toString()
            );
            console.log("is following" + ifFollowing);
            console.log(ifFollowing && ifFollowed);

            if (!ifFollowing && !ifFollowed) 
                return next(appError("You are not following this user", 400));
            }

            userWhoIsBeingUnFollowed.followers = userWhoIsBeingUnFollowed.followers.filter(
                followerId => followerId.toString() !== userWantToUnfollow._id.toString());

            userWantToUnfollow.following = userWantToUnfollow.following.filter(
                followingId => followingId.toString() !== userWhoIsBeingUnFollowed._id.toString());
            
            await userWhoIsBeingUnFollowed.save();
            await userWantToUnfollow.save();

            return res.json({
                status: "success",
                data:  `You have unfollowed this user successfully`
            })
        }
        catch (error) {
        return next(appError(error.message, 500));
    }
}


const BlockProfileContrl = async(req, res, next) => {
    try {

        const userWantToBlock = await User.findById(req.params.id);
        const userToBeBlocked = await User.findById(req.userAuth);

        if (userWantToBlock && userToBeBlocked) {

            const ifUserIsAlreadyBlocked = userWantToBlock.blocked.find(contact =>
                 contact.toString() === userToBeBlocked._id.toJSON())
            
            if (ifUserIsAlreadyBlocked) 
                return next(appError("You already blocked this user", 400));
            }

            userWantToBlock.blocked.push(userToBeBlocked._id);
            userWantToBlock.save();
            console.log("in blocked lists" + userWantToBlock.blocked)

            return res.json({
                status: "success",
                data:  `You have blocked this user successfully`
            })
        }
        catch (error) {
        return next(appError(error.message, 500));
    }
}

const unBlockProfileContrl = async(req, res, next) => {
    try {

        const userWantToUnBlock = await User.findById(req.params.id);
        const userToBeUnBlocked = await User.findById(req.userAuth);

        if (userWantToUnBlock && userToBeUnBlocked) {

            const ifUserIsBlocked = userWantToUnBlock.blocked.find(contact =>
                 contact.toString() === userToBeUnBlocked._id.toJSON());
            
            if (ifUserIsBlocked) {
                userWantToUnBlock.blocked = userWantToUnBlock.blocked.filter(
                blockedId => blockedId.toString() !== userToBeUnBlocked._id.toString());

                userWantToUnBlock.save();
                return res.json({
                    status: "success",
                    data:  `You have unblocked this user successfully`
                })
                
            }
            return next(appError("You havent blocked this user", 400));
            
        }

    }  catch (error) {
        return next(appError(error.message, 500));
    }
}

const adminBlockUserCtrl = async (req, res, next) => {
    try {
        const userToBeBlocked = await  User.findById(req.params.userId);

        if (!userToBeBlocked) {
            return next(appError("User not found", 400));

        }
        userToBeBlocked.isBlocked = true;
        await userToBeBlocked.save();

        return res.json({
            status: "success",
            data: "Admin has blocked user successfully"
        })
    } catch (error) {
        return next(appError(error.message, 400))
    }
}





module.exports = {
    registerUser, 
    loginUser, 
    getUserById, 
    updateUserById, 
    deleteUserById,
    getAllUsers,
    uploadProfilePhoto,
    getViewers,
    followContrl,
    unFollowContrl,
    BlockProfileContrl,
    unBlockProfileContrl,
    adminBlockUserCtrl

}