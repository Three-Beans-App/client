import React from "react";
import { renderHook } from "@testing-library/react";
import { act } from "react";
import UserProvider, { useUserData, useUserDispatch } from "../src/contexts/userContext";
import axios from "axios";

jest.mock("axios");

describe('UserContext', () => {
    let wrapper;

    beforeEach(() => {
        localStorage.clear();
        wrapper = ({ children }) => <UserProvider>{children}</UserProvider>
    });

    const mockLocalStorage = (key, value) => {
        localStorage.setItem(key, value);
    };


    describe('makeSignupRequest', () => {
        it('should sign up a user and store their data', async () => {
            const testSignup = {
                data: {
                    token: 'token',
                    decodedJwt: { id: '123' },
                    newUser: { _id: '123', admin: false },
                    message: 'Signup successful'
                }
            };
            axios.post.mockResolvedValue(testSignup);

            const { result } = renderHook(() => {
                const dispatch = useUserDispatch();
                return { dispatch };
            }, { wrapper });

            let signUpResult;
            await act(async () => {
                signUpResult = await result.current.dispatch.makeSignupRequest(
                    'Test',
                    'user@test.com',
                    'password',
                    '1999-03-11'
                );

                expect(axios.post).toHaveBeenCalledWith(
                    expect.stringContaining('/users/signup'),
                    {
                        name: 'Test',
                        email: 'user@test.com',
                        password: 'password',
                        birthday: '1999-03-11'
                    }
                );
                expect(localStorage.getItem('userJwt')).toBe('token');
                expect(localStorage.getItem('isLoggedIn')).toBe('true');
                expect(localStorage.getItem('userId')).toBe('123');
                expect(localStorage.getItem('isAdmin')).toBe('false');
                expect(signUpResult.success).toBe(true);
                expect(signUpResult.message).toBe('Signup successful');
            });
        });
    });


    describe('makeLoginRequest', () => {
        it('should log in a user and store the relevant data', async () => {
            const testLogin = {
                data: {
                    token: 'token',
                    decodedUserJwt: { id: '123' },
                    userId: '123',
                    admin: true
                },
                status: 200
            };
            axios.post.mockResolvedValue(testLogin);

            const { result } = renderHook(() => {
                const dispatch = useUserDispatch();
                return { dispatch };
            }, { wrapper });

            let loginResult;
            await act(async () => {
                loginResult = await result.current.dispatch.makeLoginRequest('user@test.com', 'password');
            });

            expect(axios.post).toHaveBeenCalledWith(
                expect.stringContaining('users/login'),
                { email: 'user@test.com', password: 'password' }
            );

            expect(localStorage.getItem('userJwt')).toBe('token');
            expect(localStorage.getItem('isLoggedIn')).toBe('true');
            expect(localStorage.getItem('userId')).toBe('123');
            expect(localStorage.getItem('isAdmin')).toBe('true');
            expect(loginResult.status).toBe(200);
        });
    });
});