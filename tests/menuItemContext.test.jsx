import React from "react";
import { renderHook } from "@testing-library/react";
import { act } from "react";
import MenuItemProvider, { useMenuItemData, useMenuItemDispatch } from "../src/contexts/menuItemContext";
import axios from "axios";

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


    describe('addMenuItem', () => {
        it('should add a new menu item', async () => {
            const newItem = {
                name: 'Test Item',
                category: 'Test Category',
                price: 10,
                description: 'Test item description',
                image: 'test-image-url'
            };

            axios.post.mockResolvedValueOnce({ status: 201 });

            const { result } = renderHook(() => {
                const data = useMenuItemData();
                const dispatch = useMenuItemDispatch();
                return { data, dispatch };
            }, { wrapper });
            
            await act(async () => {
                await result.current.dispatch.addMenuItem(
                    newItem.name,
                    newItem.category,
                    newItem.price,
                    newItem.description,
                    newItem.image
                );
            });

            expect(axios.post).toHaveBeenCalledWith(
                expect.stringContaining('/menu/create/item/'),
                expect.objectContaining(newItem),
                expect.any(Object)
            );
        });
    });


    describe('updateMenuItem', () => {
        it('should update an existing menu item', async () => {
            const updatedItem = {
                id: '1',
                name: 'Updated Item',
                category: 'Updated Category',
                price: 15,
                description: 'Updated description',
                image: 'updated-image-url'
            };

            axios.patch.mockResolvedValueOnce({ status: 200 });

            const { result } = renderHook(() => {
                const data = useMenuItemData();
                const dispatch = useMenuItemDispatch();
                return { data, dispatch };
            }, { wrapper });

            await act(async () => {
                await result.current.dispatch.updateMenuItem(
                    updatedItem.id,
                    updatedItem.name,
                    updatedItem.category,
                    updatedItem.price,
                    updatedItem.description,
                    updatedItem.image
                );
            });

            expect(axios.patch).toHaveBeenCalledWith(
                expect.stringContaining(`/menu/update/item/${updatedItem.id}`),
                expect.objectContaining({
                    name: updatedItem.name,
                    category:updatedItem.category,
                    price: updatedItem.price
                }),
                expect.any(Object)
            );
        });
    });


    describe('getMenuItemById', () => {
        it('should return a menu item by ID', () => {
            const testMenuItems = [
                { _id: '1', name: 'Test Item 1' },
                { _id: '2', name: 'Test Item 2' }
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

            const menuItem = result.current.dispatch.getMenuItemById('2');
            expect(menuItem).toEqual(testMenuItems[1]);
        })
    });


    describe('deleteMenuItem', () => {
        it('should delete a menu item by ID', async () => {
            const itemId = '1';

            axios.delete.mockResolvedValueOnce({ status: 200 });

            const { result } = renderHook(() => {
                const data = useMenuItemData();
                const dispatch = useMenuItemDispatch();
                return { data, dispatch };
            }, { wrapper });

            await act(async () => {
                await result.current.dispatch.deleteMenuItem(itemId);
            });

            expect(axios.delete).toHaveBeenCalledWith(
                expect.stringContaining(`/menu/delete/item/${itemId}`),
                expect.any(Object)
            );
        });
    });
});