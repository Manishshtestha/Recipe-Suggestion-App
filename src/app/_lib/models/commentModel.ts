import mongoose, { Model, Schema, Document, Types } from "mongoose";
import { IUser } from "./userModel"; // Make sure this path is correct

// Interface describing the Comment document structure
export interface IComment extends Document {
    content: string;
    user: Types.ObjectId | IUser;       // Reference to the user who posted. Can be populated.
    recipe: Types.ObjectId;           // Reference to the recipe it belongs to.
    parentComment?: Types.ObjectId | IComment | null; // For replies (reference to parent comment)
    likes: Types.ObjectId[];          // Array of user IDs who liked the comment
    reports: Types.ObjectId[];         // Array of user IDs who reported the comment
    isDeleted: boolean;               // For soft deletes
    isEdited: boolean;                // Flag if the comment was edited
    createdAt: Date;                  // Handled by timestamps
    updatedAt: Date;                  // Handled by timestamps
}

// Mongoose Schema for the Comment
const CommentSchema: Schema<IComment> = new Schema({
    content: {
        type: String,
        required: [true, 'Comment content cannot be empty.'],
        trim: true,
        maxlength: [1000, 'Comment cannot exceed 1000 characters.'] // Example length limit
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Creates a reference to the User model
        required: true,
    },
    recipe: {
        type: Schema.Types.ObjectId,
        ref: 'Recipe', // Creates a reference to the Recipe model
        required: true,
        index: true, // Indexing recipe ID for faster comment lookups per recipe
    },
    parentComment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment', // Self-reference for replies
        default: null, // Top-level comments have this as null
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    reports: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    isDeleted: {
        type: Boolean,
        default: false,
    },
    isEdited: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Middleware example (optional): Ensure user exists before liking/reporting?
// You might handle this check in the API route instead.

// Prevent model recompilation in Next.js dev environment
const CommentModel: Model<IComment> =
    mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema);

export default CommentModel;
