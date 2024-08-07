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


    describe('getFavouriteMenuItems', () => {
        it('should return items within the favourite list', () => {
            const testMenuItems = [
                { _id: '1', name: 'Test Item'},
                { _id: '2', name: 'Test Item 2'},
                { _id: '3', name: 'Test Item 3'}
            ];

            const favouriteList = [
                { item: { itemId: '1'} },
                { item: { itemId: '3'} }
            ];

            wrapper = ({ children }) => (
                <MenuItemProvider defaultMenuItems={testMenuItems}>
                    {children}
                </MenuItemProvider>
            );

            const { result } = renderHook(() => {
                const data = useMenuItemData();
                const dispatch = useMenuItemDispatch();
                return { data, dispatch };
            }, { wrapper });

            const favouriteItems = result.current.dispatch.getFavouriteMenuItems(favouriteList);

            console.log('Favourite Items:', favouriteItems);
            expect(favouriteItems).toEqual([testMenuItems[0], testMenuItems[2]]);
            });        
        });


    describe('fetchMenuItems', () => {
        it('should fetch and set menu items', async () => {
            const testMenuItems = [
                { _id: '1', name: 'Test Item' },
                { _id: '2', name: 'Test Item 2' }
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


    describe('fetchCategories', () => {
        it('should fetch and set categories', async () => {
            const testCategories = [
                {_id: '1', name: 'Test Category'},
                {_id: '1', name: 'Test Category 2'}
            ];
            axios.get.mockResolvedValue({ data: { result: testCategories }});

            const { result } = renderHook(() => {
                const data = useMenuItemData();
                const dispatch = useMenuItemDispatch();
                return { data, dispatch };
            }, { wrapper });

            await act(async () => {
                await result.current.dispatch.fetchCategories();
            });

            expect(result.current.data.categories).toEqual(testCategories);
        });
    });
});