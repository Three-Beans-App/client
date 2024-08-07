import React from "react";
import { renderHook } from "@testing-library/react";
import { act } from "react";
import MenuItemProvider, { useMenuItemData, useMenuItemDispatch } from "../src/contexts/menuItemContext";
import axios from "axios";
import { useUserData } from "../src/contexts/userContext";


jest.mock('../src/contexts/userContext', () => ({
    useUserData: () => ({
        userJwt: 'token'
    })
}));

jest.mock("axios");


describe('MenuItemContext', () => {
    let wrapper;

    beforeEach(() => {
        localStorage.clear();
        wrapper = ({ children }) => <MenuItemProvider>{children}</MenuItemProvider>;
    });

    describe('fetchMenuItems', () => {
        it('should fetch and set menu items', async () => {
            const testMenuItems = [
                {
                    _id: '1',
                    name: 'Test Item'
                },
                {
                    _id: '2',
                    name: 'Test Item 2'
                }
            ];
            axios.get.mockResolvedValue({ data: { result: testMenuItems}});

            const { result } = renderHook(() => {
                const data = useMenuItemData();
                const dispatch = useMenuItemDispatch();
                return { data, dispatch };
            }, { wrapper });

            await act(async () => {
                await result.current.dispatch.fetchMenuItems();
            });

            expect(result.current.data.menuItems).toEqual(testMenuItems);
        });
    });
});