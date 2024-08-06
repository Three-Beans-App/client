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


    describe('handleAddToCart', () => {
        it('should add an item to the cart', () => {
            const { result } = renderHook(() => {
                const data = useCartData();
                const dispatch = useCartDispatch();
                return { data, dispatch };
            }, { wrapper });
    
            act(() => {
                result.current.dispatch.handleAddToCart({ 
                    name: 'Test Item',
                    price: 10
                });
            });
    
            expect(result.current.data.cartItems.length).toBe(1);
            expect(result.current.data.cartItems[0].item.name).toBe('Test Item');
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
                    name: 'Test Item',
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
                    name: 'Test Item',
                    price: 10
                });
            });
    
            expect(updatedResult.current.data.cartItems.length).toBe(1);
            expect(updatedResult.current.data.cartItems[0].quantity).toBe(2);     
        });
    });
    
    
    describe('handleQuantityChange', () => {
        it('should change the quantity of an item in the cart', () => {
            const { result: initialResult } = renderHook(() => {
                const data = useCartData();
                const dispatch = useCartDispatch();
                return { data, dispatch };
            }, { wrapper });

            act(() => {
                initialResult.current.dispatch.handleAddToCart({
                    name: 'Test Item',
                    price: 10
                });
            });

            act(() => {
                initialResult.current.dispatch.handleQuantityChange('Test Item', 5);
            });

            const { result: updatedResult } = renderHook(() => useCartData(), { wrapper });

            expect(updatedResult.current.cartItems[0].quantity).toBe(5);
        });
    });


    describe('handleRemoveItem', () => {
        it('should remove an item from the cart', () => {
            const { result: initialResult } = renderHook(() => {
                const data = useCartData();
                const dispatch = useCartDispatch();
                return { data, dispatch };
            }, { wrapper });

            act(() => {
                initialResult.current.dispatch.handleAddToCart({
                    name: 'Test Item',
                    price: 10
                });
            });

            act(() => {
                initialResult.current.dispatch.handleRemoveItem('Test Item');
            });

            const { result: updatedResult } = renderHook(() => useCartData(), { wrapper });

            expect(updatedResult.current.cartItems.length).toBe(0);
        });
    });
});