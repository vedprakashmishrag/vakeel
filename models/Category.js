// category models
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {           
        type: String,           
        required: true
        }, 
    created_at: {
        type: Date,
        default: Date.now()
        },
    updated_at: {
        type: Date,           
        default: Date.now()
        }
});

export default mongoose.model('Category', CategorySchema
);
        