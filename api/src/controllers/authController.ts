import { compareSync } from 'bcrypt';
import { RequestHandler } from 'express';
import { signAccess, signRefresh, cookieOptions } from '../utilities/cookies';
import { Unauthorized } from '../utilities/errors';
import { UserRequestHandler } from '../ts/interfaces';
import User from '../models/User';
import { Requestor } from '../ts/types';

const register: UserRequestHandler = async (req, res) => {
	// Extract the `status` property from the request body
	const { status, ...userBody } = req.body;

	// Create a new user document using the `User` model and the remaining properties in the request body
	await User.create(userBody);

	// Send a response with a success message
	res.json({ message: 'Registered successfully' });
};

const login: UserRequestHandler = async (req, res) => {
    // Extract email and password from the request body
    const { email, password } = req.body.credentials;

    // Find a user with the given email in the database and retrieve their password
    // Only retrieve the password, employeeId and role fields from the user document
    const user = await User.findOne(
        { 'credentials.email': email },
        { 'credentials.password': 1, employeeId: 1, role: 1 }
    ).exec();

    // If there is no user with the given email or the password is incorrect, throw an Unauthorized error
    if (!user || !compareSync(password, user.credentials.password))
        throw new Unauthorized('Invalid email or password');

    // Create a requestor object with the user's employeeId, role and the current date
    const requestor: Requestor = {
        employeeId: user.employeeId,
        role: user.role,
        createdAt: new Date()
    };

    // Generate access and refresh tokens using the requestor object and sign them
    // Set the access-token and refresh-token cookies with the generated tokens and the cookie options
    // Send a JSON response indicating successful login
    res.cookie('access-token', signAccess(requestor), cookieOptions.access)
        .cookie('refresh-token', signRefresh(requestor), cookieOptions.refresh)
        .json({ message: 'Logged in successfully' });
};


const logout: RequestHandler = (_req, res) => {
	res.cookie('access-token', '', cookieOptions.default)
		.cookie('refresh-token', '', cookieOptions.default)
		.json('Logged out successfully');
};

export { register, login, logout };
