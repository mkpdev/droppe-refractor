import React from "react";
import Form from "./index";
import { render, screen } from "@testing-library/react";
import * as ReactDOM from "react-dom";
import { fireEvent } from '@testing-library/react'
import { Product } from "../../model";

describe("Initial render with fields", () => {
    let container: HTMLDivElement;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(<Form on-submit={function (payload: Product): void {
            throw new Error("Function not implemented.");
        }} />, container)
    })

    afterEach(() => {
        document.body.removeChild(container);
        container.remove()
    })

    it("Render correctly check", () => {
        expect(screen.getByTestId("productAdd-form")).toBeInTheDocument();
        expect(screen.getByTestId("title")).toBeVisible()
        expect(screen.getByTestId("price")).toBeVisible()
        expect(screen.getByTestId("description")).toBeVisible()
        expect(screen.getByTestId("Submit").textContent).toBe('Add a product')


    })

    it('should call handleChange for title field', () => {
        const event = {
            preventDefault() { },
            target: {
                value: "title"
            }
        }
        const titleInput = screen.getByTestId("title");
        fireEvent.change(titleInput, event)
    })

    it('should call handleChange for price field', () => {
        const event = {
            preventDefault() { },
            target: {
                value: 20
            }
        }
        const priceInput = screen.getByTestId("price");
        fireEvent.change(priceInput, event)
    })

    it('should call handleChange for description field', () => {
        const event = {
            preventDefault() { },
            target: {
                value: "description"
            }
        }
        const descInput = screen.getByTestId("description");
        fireEvent.change(descInput, event)
    })

    it('shoudld call onSubmit on form', () => {
        const jsdomAlert = window.alert;  
        window.alert = () => { }; 

        const descInput = screen.getByTestId("productAdd-form");
        fireEvent.submit(descInput)
        window.alert = jsdomAlert;

    })

    it('alerts on submit click', async () => {
        const alertMock = jest.spyOn(window,'alert').mockImplementation(); 
        const event = screen.getByTestId('Submit')
        fireEvent.click(event)
        expect(alertMock).toHaveBeenCalledTimes(1)
      })

})



