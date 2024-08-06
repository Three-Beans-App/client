import React from "react";
import { renderHook } from "@testing-library/react";
import { act } from "react";
import FavouriteProvider, { useFavouriteData, useFavouriteDispatch } from "../src/contexts/favouriteContext";
import axios from "axios";


jest.mock('../src/contexts/userContext', () => ({
    useUserData: () => ({
        userJwt: 'test-jwt-token',
        userId: 'test-user-id'
    })
}));

jest.mock("axios");

describe('Favourite Context', () => {
    let wrapper;

    beforeEach(() => {
        localStorage.clear();
        wrapper = ({ children }) => <FavouriteProvider>{children}</FavouriteProvider>;
    });

    describe('onClickStar', () => {
        it('should add an item to the favourite list', async () => {
            const testItem = { 
                _id: '1234', 
                name: 'Test Item'
            };
            const testResponse = {
                data: {
                    favourite: {
                        _id: 'fav1234',
                        item: testItem
                    }
                }
            };

            axios.post.mockResolvedValue(testResponse);

            const { result } = renderHook(() => {
                const data = useFavouriteData();
                const dispatch = useFavouriteDispatch();
                return { data, dispatch };
            }, { wrapper });

            await act(async () => {
                await result.current.dispatch.onClickStar(testItem);
            });

            expect(result.current.data.favouriteList.length).toBe(1);
            expect(result.current.data.favouriteList[0].item).toEqual(testItem);
        });
    });
});