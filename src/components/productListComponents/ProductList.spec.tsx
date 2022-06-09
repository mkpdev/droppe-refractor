import '@testing-library/jest-dom'
import { Product } from "../productListComponents/index";
import React from "react";
import { screen } from "@testing-library/react";
import * as ReactDOM from "react-dom";

describe("Initial render with fields", () => {
    let container: HTMLDivElement;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(<Product index={0} product={{
            id: 0,
            title: "",
            description: "",
            price: 0,
            isFavorite: false,
            rating: {
                rate: 0,
                count: 0
            }
        }} onFav={function (title: string): void {
            throw new Error("Function not implemented.");
        }} />, container)
    })

    afterEach(() => {
        document.body.removeChild(container);
        container.remove()
    })

    it("Render correctly check", () => {
        expect(screen.getByTestId("Description").textContent).toBe('Description:')
        expect(screen.getByText('Rating: 0/5')).toBeVisible()
        expect(screen.getByText('Price: $0')).toBeVisible()
    })

})