import React from "react";
import { renderHook } from "@testing-library/react";
import { act } from "react";
import CartProvider, { useCartData, useCartDispatch, UseCartDispatch } from "../src/contexts/cartContext";

describe('Cart Context', () => {
    beforeEach(() => {
        localStorage.clear();
    }) ;

    it('should add an item to the cart', () => {
        const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

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
});