import { render } from "@testing-library/react";
import React from "react";
import FilterButton from "./FilterButton";
describe("should render filter buttons",()=>{
    it("should have all filter button",()=>{
        const filterButtons={name:"All" ,isPressed:"false"}
        const component=render(<FilterButton name="All" isPressed="false"/>);
        expect(component.getByTestId("All")).not.toBeDisabled();

    })
})