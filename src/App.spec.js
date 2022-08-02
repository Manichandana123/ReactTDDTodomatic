import shallow, { fireEvent, getByDisplayValue, render } from "@testing-library/react";
import React from "react";
import App from "./App";
describe("Basic rendering of Todomatic",()=>{
    it("must have a header with the title Todomatic",()=>{
        const {getByTestId} = render(<App/>);
        expect(getByTestId("header")).toHaveTextContent("TodoMatic");
    })
    it("should bear the label What Must Be Done?",()=>{
        const {getByTestId} = render(<App/>);
        expect(getByTestId("formLabel")).toHaveTextContent("What needs to be done?");

    })
    it("should include a field for entering the task name",()=>{
        const {getByTestId} = render(<App/>);
        expect(getByTestId("new-todo-input")).toHaveTextContent("");
    })
    it("Should have a add button",()=>{
        const {getByTestId} = render(<App/>);
        expect(getByTestId("addtaskbutton")).not.toBeDisabled();

    })

    it("should have filter buttons",()=>{
        const component = render(<App/>);
        expect(component.getByTestId("All")).not.toBeDisabled();
        expect(component.getByTestId("Completed")).not.toBeDisabled();
        expect(component.getByTestId("Active")).not.toBeDisabled();

    })
    it("should have all the tasks",()=>{
        const Data=[
            { id: "todo-0", name: "Eat", completed: true },
            { id: "todo-1", name: "Sleep", completed: false },
            { id: "todo-2", name: "Repeat", completed: false }
          ];
        const component=render(<App tasks={Data}/>);
        
          const listItems=component.queryAllByRole('listitem');
          expect(listItems).toHaveLength(3);
          listItems.array?.forEach((element,index) => {expect(component.getByTestId(Data[index].name)).toHaveTextContent(Data[index].name),
            Data[index].completed?expect(component.getByTestId(Data[index].id+"checkbox")).toBeChecked():expect(component.getByTestId(Data[index].id+"checkbox")).not.toBeChecked()
            expect(component.getByTestId("deletebutton"+Data[index].id)).not.toBeDisabled(),
            expect(component.getByTestId("editbutton"+Data[index].id)).not.toBeDisabled();


        });
    })

})
describe("should test the todomatic's functionality",()=>{
    it("should be able to add a task",()=>{
        const Databeforeaddingtask=[
            { id: "todo-0", name: "Eat", completed: true },
            { id: "todo-1", name: "Repeat", completed: false },
          ];
        const Data=[
            { id: "todo-0", name: "Eat", completed: true },
            { id: "todo-1", name: "Repeat", completed: false },
            { id: "todo-2", name: "Sleep", completed: false }
        ]
        const component=render(<App tasks={Databeforeaddingtask}/>);
        component.getByTestId('new-todo-input').innerHTML="Sleep";
        console.log(component.getByTestId('new-todo-input').innerHTML);
        fireEvent.change(component.getByTestId('new-todo-input'),{target:{value:"Sleep"}})
        fireEvent.click(component.getByTestId('addtaskbutton'));
        const listItems=component.queryAllByRole('listitem');
          expect(listItems).toHaveLength(3);
          listItems.forEach((element,index) => {expect(component.getByTestId(Data[index].name)).toHaveTextContent(Data[index].name),
            Data[index].completed?expect(component.getByTestId(Data[index].id+"checkbox")).toBeChecked():expect(component.getByTestId(Data[index].id+"checkbox")).not.toBeChecked()
            expect(component.getByTestId("deletebutton"+Data[index].id)).not.toBeDisabled(),
            expect(component.getByTestId("editbutton"+Data[index].id)).not.toBeDisabled();


        });
        


    })
    it("should be able to delete a task",()=>{
        const DatabeforeDeletingtask=[
            { id: "todo-0", name: "Eat", completed: true },
            { id: "todo-1", name: "Repeat", completed: false },
            { id: "todo-2", name: "Sleep", completed: false }

        ]
        const Data=[
            { id: "todo-0", name: "Eat", completed: true },
            { id: "todo-1", name: "Repeat", completed: false },
            
        ]
        const component=render(<App tasks={DatabeforeDeletingtask}/>);
        fireEvent.click(component.getByTestId('deletebuttontodo-2'));
        const listItems=component.queryAllByRole('listitem');
          expect(listItems).toHaveLength(2);
          listItems.forEach((element,index) => {expect(component.getByTestId(Data[index].name)).toHaveTextContent(Data[index].name),
            Data[index].completed?expect(component.getByTestId(Data[index].id+"checkbox")).toBeChecked():expect(component.getByTestId(Data[index].id+"checkbox")).not.toBeChecked()
            expect(component.getByTestId("deletebutton"+Data[index].id)).not.toBeDisabled(),
            expect(component.getByTestId("editbutton"+Data[index].id)).not.toBeDisabled();


        });



    })
    it("should able to mark a task as completed",()=>{
        const DataBeforeMarkingTheTaskAsCompleted=[
            { id: "todo-0", name: "Eat", completed: true },
            { id: "todo-1", name: "Repeat", completed: false },
            { id: "todo-2", name: "Sleep", completed: false }

        ]
        const component=render(<App tasks={DataBeforeMarkingTheTaskAsCompleted}/>);
        fireEvent.click(component.getByTestId("todo-1checkbox"));
        expect(component.getByTestId("todo-1checkbox")).toBeChecked();

    })
    it("should able to uncheck a completed task ",()=>{
        const DataBeforeMarkingTheTaskAsCompleted=[
            { id: "todo-0", name: "Eat", completed: true },
            { id: "todo-1", name: "Repeat", completed: false },
            { id: "todo-2", name: "Sleep", completed: false }

        ]
        const component=render(<App tasks={DataBeforeMarkingTheTaskAsCompleted}/>);
        fireEvent.click(component.getByTestId("todo-0checkbox"));
        expect(component.getByTestId("todo-1checkbox")).not.toBeChecked();

    })
    it("should be able to get all the tasks",()=>{
        const Data=[
            { id: "todo-0", name: "Eat", completed: true },
            { id: "todo-1", name: "Sleep", completed: false },
            { id: "todo-2", name: "Repeat", completed: false }
          ];
        const component=render(<App tasks={Data}/>);
        fireEvent.click(component.getByTestId("All"))
          const listItems=component.queryAllByRole('listitem');
          expect(listItems).toHaveLength(3);
          listItems.array?.forEach((element,index) => {expect(component.getByTestId(Data[index].name)).toHaveTextContent(Data[index].name),
            Data[index].completed?expect(component.getByTestId(Data[index].id+"checkbox")).toBeChecked():expect(component.getByTestId(Data[index].id+"checkbox")).not.toBeChecked()
            expect(component.getByTestId("deletebutton"+Data[index].id)).not.toBeDisabled(),
            expect(component.getByTestId("editbutton"+Data[index].id)).not.toBeDisabled();


        });

    })
    it("should be able to filter completed tasks",()=>{
        const DataBeforeCompletedFilter=[
            { id: "todo-0", name: "Eat", completed: true },
            { id: "todo-1", name: "Sleep", completed: false },
            { id: "todo-2", name: "Repeat", completed: false }
          ];
        const Data=[
            { id: "todo-0", name: "Eat", completed: true }
          ];
        const component=render(<App tasks={DataBeforeCompletedFilter}/>);
        fireEvent.click(component.getByTestId("Completed"))
          const listItems=component.queryAllByRole('listitem');
          expect(listItems).toHaveLength(1);
          listItems.array?.forEach((element,index) => {expect(component.getByTestId(Data[index].name)).toHaveTextContent(Data[index].name),
            Data[index].completed?expect(component.getByTestId(Data[index].id+"checkbox")).toBeChecked():expect(component.getByTestId(Data[index].id+"checkbox")).not.toBeChecked()
            expect(component.getByTestId("deletebutton"+Data[index].id)).not.toBeDisabled(),
            expect(component.getByTestId("editbutton"+Data[index].id)).not.toBeDisabled();


        });

    })
    it("should be able to render active tasks",()=>{
        const DataBeforeActiveFilter=[
            { id: "todo-0", name: "Eat", completed: true },
            { id: "todo-1", name: "Sleep", completed: false },
            { id: "todo-2", name: "Repeat", completed: false }
          ];
        const Data=[
            { id: "todo-1", name: "Sleep", completed: false },
            { id: "todo-2", name: "Repeat", completed: false }
          ];
        const component=render(<App tasks={DataBeforeActiveFilter}/>);
        fireEvent.click(component.getByTestId("Active"))
          const listItems=component.queryAllByRole('listitem');
          expect(listItems).toHaveLength(2);
          listItems.array?.forEach((element,index) => {expect(component.getByTestId(Data[index].name)).toHaveTextContent(Data[index].name),
            Data[index].completed?expect(component.getByTestId(Data[index].id+"checkbox")).toBeChecked():expect(component.getByTestId(Data[index].id+"checkbox")).not.toBeChecked()
            expect(component.getByTestId("deletebutton"+Data[index].id)).not.toBeDisabled(),
            expect(component.getByTestId("editbutton"+Data[index].id)).not.toBeDisabled();


        });

    })
    it("should be able to edit task name",()=>{
        const DataBeforeEditingTask=[
            { id: "todo-0", name: "Eat", completed: true },
            { id: "todo-1", name: "Sleep", completed: false },
            { id: "todo-2", name: "Repeat", completed: false }
          ];
          const Data=[
            { id: "todo-0", name: "Walk", completed: true },
            { id: "todo-1", name: "Sleep", completed: false },
            { id: "todo-2", name: "Repeat", completed: false }
          ];
        const component=render(<App tasks={DataBeforeEditingTask}/>);
        fireEvent.click(component.getByTestId("editbuttontodo-0"));
        fireEvent.change(component.getByTestId("todo-0tasknewname"),{target:{value:"Walk"}});
        fireEvent.click(component.getByTestId("todo-0savebutton"));
        const listItems=component.queryAllByRole('listitem');
          expect(listItems).toHaveLength(3);
          listItems.array?.forEach((element,index) => {expect(component.getByTestId(Data[index].name)).toHaveTextContent(Data[index].name),
            Data[index].completed?expect(component.getByTestId(Data[index].id+"checkbox")).toBeChecked():expect(component.getByTestId(Data[index].id+"checkbox")).not.toBeChecked()
            expect(component.getByTestId("deletebutton"+Data[index].id)).not.toBeDisabled(),
            expect(component.getByTestId("editbutton"+Data[index].id)).not.toBeDisabled();


        });
        
        




    })
    it("should be able to edit task name",()=>{
        const DataBeforeEditingTask=[
            { id: "todo-0", name: "Eat", completed: true },
            { id: "todo-1", name: "Sleep", completed: false },
            { id: "todo-2", name: "Repeat", completed: false }
          ];
          const Data=[
            { id: "todo-0", name: "Walk", completed: true },
            { id: "todo-1", name: "Sleep", completed: false },
            { id: "todo-2", name: "Repeat", completed: false }
          ];
        const component=render(<App tasks={Data}/>);
        fireEvent.click(component.getByTestId("editbuttontodo-0"));
        fireEvent.change(component.getByTestId("todo-0tasknewname"),{target:{value:"Walk"}});
        fireEvent.click(component.getByTestId("todo-0canceledit"));
        const listItems=component.queryAllByRole('listitem');
          expect(listItems).toHaveLength(3);
          listItems.array?.forEach((element,index) => {expect(component.getByTestId(Data[index].name)).toHaveTextContent(Data[index].name),
            Data[index].completed?expect(component.getByTestId(Data[index].id+"checkbox")).toBeChecked():expect(component.getByTestId(Data[index].id+"checkbox")).not.toBeChecked()
            expect(component.getByTestId("deletebutton"+Data[index].id)).not.toBeDisabled(),
            expect(component.getByTestId("editbutton"+Data[index].id)).not.toBeDisabled();


        });

    })
})