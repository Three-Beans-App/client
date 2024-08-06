import React from "react";
import { renderHook } from "@testing-library/react";
import { act } from "react";
import CartProvider, { useCartData, useCartDispatch } from "../src/contexts/cartContext";
import { useActionData } from "react-router-dom";

describe('Cart Context', () => {
    let wrapper;

    beforeEach(() => {
        localStorage.clear();
        wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;
    });

    it('should add an item to the cart', () => {
        const { result } = renderHook(() => {
            const data = useCartData();
            const dispatch = useCartDispatch();
            return { data, dispatch };
        }, { wrapper });

        act(() => {
            result.current.dispatch.handleAddToCart({ 
                name: 'Item 1',
                price: 10
            });
        });

        expect(result.current.data.cartItems.length).toBe(1);
        expect(result.current.data.cartItems[0].item.name).toBe('Item 1');
        expect(result.current.data.cartItems[0].quantity).toBe(1);
    });

    it('should update the quantity of an item in the cart', () => {
        const { result: initialResult } = renderHook(() => {
            const data = useCartData();
            const dispatch = useCartDispatch();
            return { data, dispatch };
        }, { wrapper });

        act(() => {
            initialResult.current.dispatch.handleAddToCart({
                name: 'Item 1',
                price: 10
            });
        });

        const { result: updatedResult } = renderHook(() => {
            const data = useCartData();
            const dispatch = useCartDispatch();
            return { data, dispatch}
        }, { wrapper });

        act(() => {
            updatedResult.current.dispatch.handleAddToCart({
                name: 'Item 1',
                price: 10
            });
        });

        expect(updatedResult.current.data.cartItems.length).toBe(1);
        expect(updatedResult.current.data.cartItems[0].quantity).toBe(2);     
    });
});