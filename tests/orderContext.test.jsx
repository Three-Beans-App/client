import React from "react";
import { renderHook } from "@testing-library/react";
import { act } from "react";
import OrderProvider, { useOrderData, useOrderDispatch } from "../src/contexts/orderContext";
import axios from "axios";
import { useUserData } from "../src/contexts/userContext";
import { useCartData } from "../src/contexts/cartContext";

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
});