import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../src/App";

jest.mock('../src/contexts/userContext', () => ({
    useUserData: () => ({
        isLoggedIn: true,
        isAdmin: true,
        userId: 'testUserId',
        userJwt: 'testJwt'
    }),
    useUserDispatch: () => jest.fn()
}));

jest.mock('../src/contexts/orderContext', () => ({
    useOrderData: () => ({
        allOrders: [],
        activeOrders: [],
        userOrderHistory: []
    }),
    useOrderDispatch: () => ({
        userViewAllOrders: jest.fn(),
        adminViewAllOrders: jest.fn(),
        adminViewActiveOrders: jest.fn(),
        userCreateOrder: jest.fn(),
        updateOrderStatus: jest.fn()
    })
}));

jest.mock('../src/contexts/menuItemContext', () => ({
    useMenuItemData: () => ({
        categories: [],
        menuItems: [
            {
                _id: '1',
                name: 'Test Item',
                category: 'Test Category',
                price: 5,
                description: 'Test description',
                image: 'test-image-url'
            },
            {
                _id: '2',
                name: 'Test Item 2',
                category: 'Test Category',
                price: 3,
                description: 'Test description 2',
                image: 'test-image2-url'
            }
        ]
    }),
    useMenuItemDispatch: () => ({
        getFavouriteMenuItems: jest.fn().mockReturnValue([
            {
                _id: '1',
                name: 'Test Item',
                category: 'Test Category',
                price: 5,
                description: 'Test description',
                image: 'test-image-url'
            }
        ]),
        getMenuItemById: jest.fn().mockReturnValue({
            name: 'Test Item',
            category: 'Test Category',
            price: 5,
            description: 'Test description',
            image: 'test-image-url'
        }),
        addMenuItem: jest.fn(),
        updateMenuItem: jest.fn(),
        deleteMenuItem: jest.fn(),
        fetchMenuItems: jest.fn(),
        fetchCategories: jest.fn()
    })
}));

jest.mock('../src/contexts/cartContext', () => ({
    useCartData: () => ({
        cartItems: []
    }),
    useCartDispatch: () => jest.fn()
}));

jest.mock('../src/contexts/favouriteContext', () => ({
    useFavouriteData: () => ({
        favouriteList: []
    }),
    useFavouriteDispatch: () => ({
        onClickStar: jest.fn(),
        fetchFavouriteList: jest.fn()
    })
}));

jest.mock('axios');


describe('App Component Rendering', () => {
    const routes = [
        "/",
        "/menu",
        "/login",
        "/signup",
        "/favourite",
        "/history",
        "/cart",
        "/confirmation",
        "/add-item",
        "/update-item/1",
        "/admin",
        "/order",
        "/view-all-orders",
        "/view-active-orders",
        "/view-sales"
    ];

    routes.forEach((route) => {
        it(`should render without crashing for route ${route}`, () => {
            expect(() => {
                render(
                    <MemoryRouter initialEntries={[route]}>
                        <App />
                    </MemoryRouter>
                );
            }).not.toThrow
        });
    });
});