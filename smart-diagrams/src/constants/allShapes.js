// import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined';
// import Rectangle from '@/asset/editor/shapes/Rectangle.svg';
// import Braces from '@/asset/editor/shapes/Braces.svg';
// import Card from '@/asset/editor/shapes/Card.svg';
// import Circle from '@/asset/editor/shapes/Circle.svg';
// import Collate_Action from '@/asset/editor/shapes/Collate Action.svg';
// import Comment_Right from '@/asset/editor/shapes/Comment Right.svg';
// import Comment from '@/asset/editor/shapes/Comment.svg';
// import Cylinder from '@/asset/editor/shapes/Cylinder.svg';
// import Database from '@/asset/editor/shapes/Database.svg';
// import Decision from '@/asset/editor/shapes/Decision.svg';
// import Delay from '@/asset/editor/shapes/Delay.svg';
// import Diamond from '@/asset/editor/shapes/Diamond.svg';
// import Direct_Access_Storage from '@/asset/editor/shapes/Direct Access Storage.svg';
// import Disk_Storage from '@/asset/editor/shapes/Disk Storage.svg';
// import Display from '@/asset/editor/shapes/Display.svg';
// import Divied_Process from '@/asset/editor/shapes/Divied Process.svg';
// import Document from '@/asset/editor/shapes/Document.svg';
// import Dubble_Circle from '@/asset/editor/shapes/Dubble Circle.svg';
// import Event from '@/asset/editor/shapes/Event.svg';
// import Extractions_Process from '@/asset/editor/shapes/Extractions Process.svg';
// import Filled_Circles from '@/asset/editor/shapes/Filled Circles.svg';
// import Fork_Join from '@/asset/editor/shapes/Fork-Join.svg';
// import Framed_Circle from '@/asset/editor/shapes/Framed Circle.svg';
// import Hexazone from '@/asset/editor/shapes/Hexazone.svg';
// import Horizontal_Cylinder from '@/asset/editor/shapes/Horizontal Cylinder.svg';
// import In_Out from '@/asset/editor/shapes/In Out.svg';
// import Internal_Storage from '@/asset/editor/shapes/Internal Storage.svg';
// import Junction from '@/asset/editor/shapes/Junction.svg';
// import Lined_Document from '@/asset/editor/shapes/Lined Document.svg';
// import Lined_Process from '@/asset/editor/shapes/Lined Process.svg';
// import Loop_Limit from '@/asset/editor/shapes/Loop Limit.svg';
// import Manual_File_Action from '@/asset/editor/shapes/Manual File Action.svg';
// import Manual_Input from '@/asset/editor/shapes/Manual Input.svg';
// import Multi_Process from '@/asset/editor/shapes/Multi Process.svg';
// import Multiple_Document from '@/asset/editor/shapes/Multiple Document.svg';
// import Odd from '@/asset/editor/shapes/Odd.svg';
// import Out_In from '@/asset/editor/shapes/Out In.svg';
// import Parallelogram_Reversed from '@/asset/editor/shapes/Parallelogram Reversed.svg';
// import Parallelogram from '@/asset/editor/shapes/parallelogram.svg';
// import Priority_Action from '@/asset/editor/shapes/Priority Action.svg';
// import Rounded from '@/asset/editor/shapes/Rounded.svg';
// import Small_Circle from '@/asset/editor/shapes/Small Circle.svg';
// import Stadium from '@/asset/editor/shapes/Stadium.svg';
// import Standard_Process from '@/asset/editor/shapes/Standard Process.svg';
// import Start from '@/asset/editor/shapes/Start.svg';
// import Stop from '@/asset/editor/shapes/Stop.svg';
// import Stored_Data from '@/asset/editor/shapes/Stored Data.svg';
// import Sub_Process from '@/asset/editor/shapes/Sub Process.svg';
// import Summary from '@/asset/editor/shapes/Summary.svg';
// import Tagged_Document from '@/asset/editor/shapes/Tagged Document.svg';
// import Tagged_Process from '@/asset/editor/shapes/Tagged Process.svg';
// import Terminal from '@/asset/editor/shapes/Terminal.svg';
// import Trapezoid_Reversed from '@/asset/editor/shapes/Trapezoid Reversed.svg';
// import Trapezoid from '@/asset/editor/shapes/Trapezoid.svg';
// import Triangle from '@/asset/editor/shapes/Triangle.svg';
// import Anchor from '@/asset/editor/shapes/Anchor.svg';
// import Paper_Tape from '@/asset/editor/shapes/Paper Tape.svg';
// import Communication_Link from '@/asset/editor/shapes/Communication Link.svg';
// import {useState} from "react";
//
// export const [count, setCount] = useState(0);
//
//
// export const BasicShapes = [
//     {
//         img: Rectangle,
//         code: `\n n${count}["Rectangle"]\n n${count}@{ shape: rect}\n`
//     },
//     {
//         img: Rounded,
//         code: `\n n1["Rounded"] \n n1@{ shape: rounded}`
//     }, {
//         img: Stadium,
//         code: `\n   n1(["Stadium"])`
//     }, {
//         img: Triangle,
//         code: `\n n1["Diamond"] \n n1@{ shape: diam}`
//     }, {
//         img: Diamond,
//         code: `\n n1["Triangle"] \n n1@{ shape: tri}`
//     }, {
//         img: Hexazone,
//         code: `\n   n1["Hexagon"] \n n1@{ shape: hex}`
//     }, {
//         img: Cylinder,
//         code: `\n n1["Cylinder"]\n n1@{ shape: cyl}`
//     }, {
//         img: Horizontal_Cylinder,
//         code: `\n n1["Horizontal Cylinder"] \nn1@{ shape: h-cyl}`
//     }, {
//         img: Circle,
//         code: `\n     n1(("Circle"))`
//     }, {
//         img: Dubble_Circle,
//         code: `\n n1["Double Circle"]\n n1@{ shape: dbl-circ}`
//     }, {
//         img: Small_Circle,
//         code: `\n  n1["Small Circle"] \n n1@{ shape: sm-circ}`
//     }, {
//         img: Framed_Circle,
//         code: `\n n1["Frames Circle"]\n n1@{ shape: fr-circ}`
//     }, {
//         img: Filled_Circles,
//         code: `\n   n1["Filled Circle"] \n n1@{ shape: f-circ}`
//     }, {
//         img: Parallelogram,
//         code: `\n    n1["Parallelogram"] \n n1@{ shape: lean-l}`
//     }, {
//         img: Parallelogram_Reversed,
//         code: `\n  n1["Parallelogram Reversed"] \n n1@{ shape: lean-r}`
//     }, {
//         img: Trapezoid,
//         code: `\n   n1["Trapezoid"] \n n1@{ shape: trap-b}`
//     }, {
//         img: Trapezoid_Reversed,
//         code: `\nn1["Trapezoid Reversed"] \n n1@{ shape: trap-t}`
//     }, {
//         img: Card,
//         code: `\n  n1["Card"]  \n  n1@{ shape: card}`
//     }, {
//         img: Odd,
//         code: `\n n1>"Odd"]`
//     }, {
//         img: Anchor,
//         code: `\n n1["Anchor"] \n n1@{ shape: anchor}`
//     },
// ]
// export const ProcessShapes = [
//     {img: Standard_Process, code: `\nn1["Standard Process"]\nn1@{ shape: proc}`},
//     {img: Sub_Process, code: `\nn1["Sub Process"]\nn1@{ shape: subproc}`},
//     {img: Tagged_Process, code: `\nn1["Tagged Process"]\nn1@{ shape: tag-proc}`},
//     {img: Multi_Process, code: `\nn1["Multi Process"]\nn1@{ shape: procs}`},
//     {img: Divied_Process, code: `\nn1["Divided Process"]\nn1@{ shape: div-proc}`},
//     {img: Extractions_Process, code: `\nn1["Extraction Process"]\nn1@{ shape: extract}`},
//     {img: Lined_Process, code: `\nn1["Lined Process"]\nn1@{ shape: lin-proc}`},
//     {img: In_Out, code: `\nn1["In Out"]\nn1@{ shape: in-out}`},
//     {img: Out_In, code: `\nn1["Out In"]\nn1@{ shape: out-in}`},
//     {img: Manual_File_Action, code: `\nn1["Manual File Action"]\nn1@{ shape: manual-file}`},
//     {img: Priority_Action, code: `\nn1["Priority Action"]\nn1@{ shape: priority}`},
//     {img: Collate_Action, code: `\nn1["Collate Action"]\nn1@{ shape: collate}`},
//     {img: Loop_Limit, code: `\nn1["Loop Limit"]\nn1@{ shape: loop-limit}`},
//     {img: Manual_Input, code: `\nn1["Manual Input"]\nn1@{ shape: manual-input}`},
//     {img: Event, code: `\nn1["Event"]\nn1@{ shape: event}`},
//     {img: Start, code: `\nn1["Start"]\nn1@{ shape: start}`},
//     {img: Stop, code: `\nn1["Stop"]\nn1@{ shape: stop}`},
//     {img: Fork_Join, code: `\nn1["Fork/Join"]\nn1@{ shape: fork}`},
//     {img: Terminal, code: `\nn1["Terminal"]\nn1@{ shape: terminal}`},
//     {img: Delay, code: `\nn1["Delay"]\nn1@{ shape: delay}`},
//     {img: Junction, code: `\nn1["Junction"]\nn1@{ shape: junction}`},
//     {img: Decision, code: `\nn1["Decision"]\nn1@{ shape: decision}`},
//     {img: Document, code: `\nn1["Document"]\nn1@{ shape: doc}`},
//     {img: Tagged_Document, code: `\nn1["Tagged Document"]\nn1@{ shape: tag-doc}`},
//     {img: Multiple_Document, code: `\nn1["Multiple Documents"]\nn1@{ shape: docs}`},
//     {img: Lined_Document, code: `\nn1["Lined Document"]\nn1@{ shape: lin-doc}`},
//     {img: Comment, code: `\nn1["Comment"]\nn1@{ shape: comment}`},
//     {img: Comment_Right, code: `\nn1["Comment Right"]\nn1@{ shape: brace-r}`},
//     {img: Braces, code: `\nn1["Braces"]\nn1@{ shape: braces}`},
//     {img: Summary, code: `\nn1["Summary"]\nn1@{ shape: summary}`},
//
// ];
//  export const TechnicalShapes = [
//     {
//         img: Database,
//         code: `\n n1["Database"]\n n1@{ shape: db}`
//     },
//     {
//         img: Disk_Storage,
//         code: `\n n1["Disk Storage"]\n n1@{ shape: disk}`
//     },
//     {
//         img: Direct_Access_Storage,
//         code: `\n n1["Direct Access Storage"]\n n1@{ shape: das}`
//     },
//     {
//         img: Internal_Storage,
//         code: `\n n1["Internal Storage"]\n n1@{ shape: internal-storage}`
//     },
//     {
//         img: Display,
//         code: `\n n1["Display"]\n n1@{ shape: display}`
//     },
//     {
//         img: Stored_Data,
//         code: `\n n1["Stored Data"]\n n1@{ shape: stored-data}`
//     },
//     {
//         img: Communication_Link,
//         code: `\n n1["Communication Link"]\n n1@{ shape: com-link}`
//     },
//     {
//         img: Paper_Tape,
//         code: `\n n1["Paper Tape"]\n n1@{ shape: paper-tape}`
//     }
// ]