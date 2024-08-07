import React from "react";
import { renderHook } from "@testing-library/react";
import { act } from "react";
import OrderProvider, { useOrderData, useOrderDispatch } from "../src/contexts/orderContext";
import axios from "axios";

jest.mock('../src/contexts/userContext', () => ({
    useUserData: () => ({
        userId: 'testUserId',
        userJwt: 'token'
    })
}));

jest.mock('../src/contexts/cartContext', () => ({
    useCartData: () => ({
        cartItems: [
            { item: { _id: '1' }, quantity: 2 },
            { item: { _id: '2' }, quantity: 1 }
        ]
    })
}));

jest.mock("axios");


describe('OrderContext', () => {
    let wrapper;

    beforeEach(() => {
        localStorage.clear();
        wrapper = ({ children }) => <OrderProvider>{children}</OrderProvider>;
    });


    describe('userViewAllOrders', () => {
        it('should fetch and set user order history', async () => {
            const testOrderHistory = [
                { _id: '1', items: [], status: 'completed' },
                { _id: '1', items: [], status: 'pending' }
            ];
            axios.get.mockResolvedValue({ data: { result: testOrderHistory } });

            const { result } = renderHook(() => {
                const data = useOrderData();
                const dispatch = useOrderDispatch();
                return { data, dispatch };
            }, { wrapper });

            await act(async () => {
                await result.current.dispatch.userViewAllOrders();
            });

            expect(axios.get).toHaveBeenCalledWith(
                expect.stringContaining('/orders/user/testUserId'),
                expect.any(Object)
            );
        });
    });


    describe('userCreateOrder', () => {
        it('should create a new order and update the user order history', async () => {
            const testOrder = {
                _id: '123',
                items: [{ itemId: '1', quantity: 2 }, { itemId: '2', quantity: 1 }],
                status: 'pending'
            };
            axios.post.mockResolvedValue({ data: { order: testOrder}});

            const { result } = renderHook(() => {
                const data = useOrderData();
                const dispatch = useOrderDispatch();
                return { data, dispatch };
            }, { wrapper });

            await act(async () => {
                await result.current.dispatch.userCreateOrder({ userId: 'testUserId', guestUser: false });  
            });

            expect(axios.post).toHaveBeenCalledWith(
                expect.stringContaining('/orders/'),
                expect.objectContaining({
                    userId: 'testUserId',
                    guestUser: false,
                    items: [{ itemId: '1', quantity: 2}, { itemId: '2', quantity: 1 }]
                })
            );
            expect(result.current.data.order).toEqual(testOrder);
            expect(result.current.data.userOrderHistory).toContainEqual(testOrder);
        });
    });


    describe('adminViewAllOrders', () => {
        it('should fetch and set all orders', async () => {
            const testOrders = [
                {_id: '1', status: 'pending'},
                {_id: '2', status: 'completed'}
            ];
            axios.get.mockResolvedValue({ data: { result: testOrders } });

            const { result } = renderHook(() => {
                const data = useOrderData();
                const dispatch = useOrderDispatch();
                return { data, dispatch };
            }, { wrapper });

            await act(async () => {
                await result.current.dispatch.adminViewAllOrders();
            });

            expect(axios.get).toHaveBeenCalledWith(
                expect.stringContaining('/orders/'),
                expect.any(Object)
            );
            expect(result.current.data.allOrders).toEqual(testOrders);
        });
    });


    describe('adminViewActiveOrders', () => {
        it('should fetch and set active orders', async () => {
            const testOrders = [
                { _id: '1', status: 'pending' },
                { _id: '2', status: 'preparing' },
            ];
            axios.get.mockResolvedValue({ data: { result: testOrders } });

            const { result } = renderHook(() => {
                const data = useOrderData();
                const dispatch = useOrderDispatch();
                return { data, dispatch };
            }, { wrapper });

            await act(async () => {
                await result.current.dispatch.adminViewActiveOrders();
            });

            expect(axios.get).toHaveBeenCalledWith(
                expect.stringContaining('/orders/active'),
                expect.any(Object)
            );
            expect(result.current.data.activeOrders.length).toBe(2);
        })
    })
});