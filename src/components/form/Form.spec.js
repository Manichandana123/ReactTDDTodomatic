import { fireEvent, render } from "@testing-library/react";
import React from "react";
import Form from "./Form";
describe("should produce basic form",()=>{
    it("should have a name-entry field with a empty value",()=>{
        const component=render(<Form/>)
        expect(component.getByTestId("new-todo-input")).toHaveTextContent("");
    })
    it("should include a text-adding button",()=>{
        const component=render(<Form/>)
        expect(component.getByTestId("addtaskbutton")).not.toBeDisabled;

    })
    it("should have a label of What needs to be done?",()=>{
        const {getByTestId} = render(<Form/>);
        expect(getByTestId("formLabel")).toHaveTextContent("What needs to be done?");

    })
})
describe("evaluating the form's functionality",()=>{
    it("should be possible to input the task name",()=>{
        const component=render(<Form/>)
        fireEvent.change(component.getByTestId('new-todo-input'),{target:{value:"Sleep"}});
        expect(component.getByTestId("new-todo-input")).toHaveAttribute("value","Sleep");
    })
})