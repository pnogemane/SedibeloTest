import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { addUser, getUser, updateUser, deleteUser } from './crud';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Add User
app.post('/addUser', async (req, res) => {
    try {
        const { user, password } = req.body;
        await addUser(user, password);
        res.status(201).send('User added successfully');
    } catch (error) {
        res.status(500).send('Error adding user: ' + error.message);
    }
});

// Get User
app.get('/getUser/:id', async (req, res) => {
    try {
        const user = await getUser(req.params.id, req.body.password);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send('Error retrieving user: ' + error.message);
    }
});

// Update User
app.put('/updateUser/:id', async (req, res) => {
    try {
        const { newUserData, password } = req.body;
        await updateUser(req.params.id, newUserData, password);
        res.status(200).send('User updated successfully');
    } catch (error) {
        res.status(500).send('Error updating user: ' + error.message);
    }
});

// Delete User
app.delete('/deleteUser/:id', async (req, res) => {
    try {
        await deleteUser(req.params.id);
        res.status(200).send('User deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting user: ' + error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
