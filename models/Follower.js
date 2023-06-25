import mongoose from 'mongoose';

const followerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        },
        follower: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    });

    const Follower = mongoose.model('Follower', followerSchema);
    export default Follower;