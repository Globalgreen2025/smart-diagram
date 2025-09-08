import sample_arc_dia from "@/asset/editor/templates/sample-arc-dia.svg";
import sample_dia from "@/asset/editor/templates/sample-dia.svg";
import simple_block_dia_with_arrow_down from "@/asset/editor/templates/simple-block-dia-with-arrow-down.svg";
import simple_block_dia_with_column from "@/asset/editor/templates/simple-block-dia-with-column.svg";
import simple_block_dia from "@/asset/editor/templates/simple-block-dia.svg";
import c4_dia from "@/asset/editor/templates/c4-dia.svg";
import class_seq_dia from "@/asset/editor/templates/class-seq-dia.svg";
import class_dia from "@/asset/editor/templates/class-dia.svg";
import class_scheme_dia from "@/asset/editor/templates/class-scheme-dia.svg";
import er_dia from "@/asset/editor/templates/er-dia.svg";
import flow_chart_with_icon from "@/asset/editor/templates/flow-chart-with-icon.svg";
import simple_flowcharts_showing_bug_ticketing
    from "@/asset/editor/templates/simple-flowcharts-showing-bug-ticketing.svg";
import project_planning_dia from "@/asset/editor/templates/project-planning-dia.svg";
import flow_chart_showing_the_carbon from "@/asset/editor/templates/flow-chart-showing-the-carbon.svg";
import flowchart_showing_the_brewing_process
    from "@/asset/editor/templates/flowchart-showing-the-brewing-process.svg";
import flow_chart_dia_with_multi_decisions from "@/asset/editor/templates/flow-chart-dia-with-multi-decions.svg";
import ex_flowchart_for_selecting_statistical
    from "@/asset/editor/templates/ex-flowchart-for-selecting-statistical.svg";
import flow_chart_with_shapes from "@/asset/editor/templates/flow-chart-with-shapes.svg";
import flow_chart_dia_with_circle_arrows from "@/asset/editor/templates/flow-chart-dia-with-circle-arrows.svg";
import flowchart_going_from_top_to_bottom from "@/asset/editor/templates/flowchart-going-from-top-to-bottom.svg";
import flowcrat_with_eff_dia from "@/asset/editor/templates/flowcrat-with-eff-dia.svg";
import flow_chart_with_subgraphs from "@/asset/editor/templates/flow-chart-with-subgraphs.svg";
import flow_chart_dia_with_classes from "@/asset/editor/templates/flow-chart-dia-with-classes.svg";
import flow_chart_dia_with_multi_dir_arrows
    from "@/asset/editor/templates/flow-chart-dia-with-multi-dir-arrows.svg";
import flow_chart_dia_with_arrows from "@/asset/editor/templates/flow-chart-dia-with-arrows.svg";
import flow_chart_dia from "@/asset/editor/templates/flow-chart-dia.svg";
import reg_gantt_chart from "@/asset/editor/templates/reg-gantt-chart.svg";
import gantt_chart_dia from "@/asset/editor/templates/gantt-chart-dia.svg";
import basic_git_graph_dia from "@/asset/editor/templates/basic-git-graph-dia.svg";
import basic_git_dia from "@/asset/editor/templates/basic-git-dia.svg";
import ver_git_dia from "@/asset/editor/templates/ver-git-dia.svg";
import mindmap_dia from "@/asset/editor/templates/mindmap-dia.svg";
import pie_chart_dia from "@/asset/editor/templates/pie-chart-dia.svg";
import pei_dia_with_data from "@/asset/editor/templates/pei-dia-with-data.svg";
import sample_quadrant_dia from "@/asset/editor/templates/sample-quadarnt-dia.svg";
import experiment_choice_dia from "@/asset/editor/templates/experiment-choice-dia.svg";
import complex_sankey_dia_2 from "@/asset/editor/templates/complex-sankey-dia-2.svg";
import complex_snakey_dia from "@/asset/editor/templates/complex-snakey-dia.svg";
import basic_seq_dia from "@/asset/editor/templates/basic-seq-dia.svg";
import log_in_process from "@/asset/editor/templates/log-in-process.svg";
import sequence_dia_with_act_sym from "@/asset/editor/templates/sequence-dia-with-act-sym.svg";
import sequence_dia_with_grouped_act from "@/asset/editor/templates/sequence-dia-with-grouped-act.svg";
import sequence_dia_with_diff_msg from "@/asset/editor/templates/sequence-dia-with-diff-msg.svg";
import sequence_dia_with_note from "@/asset/editor/templates/sequence-dia-with-note.svg";
import sequence_with_auto_num_dia from "@/asset/editor/templates/sequence-with-auto-num-dia.svg";
import sequence_with_loop_dia from "@/asset/editor/templates/sequence-with-loop-dia.svg";
import sequence_dia from "@/asset/editor/templates/sequence-dia.svg";
import photosynthesis_dia from "@/asset/editor/templates/photosythesis-dia.svg";
import basic_snakey_dia from "@/asset/editor/templates/basic-snakey-dia.svg";
import complex_sankey_dia from "@/asset/editor/templates/complex-sankey-dia.svg";
import basic_state_dia from "@/asset/editor/templates/basic-state-dia.svg";
import ex_timeline_dia from "@/asset/editor/templates/ex-timeline-dia.svg";
import project_timeline_dia from "@/asset/editor/templates/project-timline-dia.svg";
import user_journey_dia from "@/asset/editor/templates/user-journey-dia.svg";
import showing_training_progress from "@/asset/editor/templates/showing-traning-progress.svg";
import basic_y_dia from "@/asset/editor/templates/bacix-y-dia.svg";
import basic_x_dia from "@/asset/editor/templates/basic-x-dia.svg";
import basic_req_dia from "@/asset/editor/templates/basic-req-dia.svg";
import complex_req_dia from "@/asset/editor/templates/complex-req-dia.svg";


export const allTemplates = [
    {
        title: "Architecture",
        content: [
            {
                img: sample_arc_dia,
                dec: "A sample architecture diagram",
                code:'architecture-beta\n' +
                    '    group api(cloud)[API]\n' +
                    '\n' +
                    '    service db(database)[Database] in api\n' +
                    '    service disk1(disk)[Storage] in api\n' +
                    '    service disk2(disk)[Storage] in api\n' +
                    '    service server(server)[Server] in api\n' +
                    '\n' +
                    '    db:L -- R:server\n' +
                    '    disk1:T -- B:server\n' +
                    '    disk2:T -- B:db\n' +
                    '    \n'
            },
        ],
    },
    {
        title: "Block",
        content: [
            {
                img: sample_dia,
                dec: "A sample block diagram",
                code: 'block-beta\n' +
                    '      columns 1\n' +
                    '        db(("DB"))\n' +
                    '        blockArrowId6<["&nbsp;&nbsp;&nbsp;"]>(down)\n' +
                    '        block:ID\n' +
                    '          A\n' +
                    '          B["A wide one in the middle"]\n' +
                    '          C\n' +
                    '        end\n' +
                    '        space\n' +
                    '        D\n' +
                    '        ID --> D\n' +
                    '        C --> D\n' +
                    '        style B fill:#d6dAdding,stroke:#333,stroke-width:4px\n' +
                    '    \n'

            },
            {
                img: simple_block_dia_with_arrow_down,
                dec: "A simple block diagram with arrow down",
                code:
                    'block-beta\n' +
                    '      columns 1\n' +
                    '      A["Start"]\n' +
                    '      down<[" "]>(down)\n' +
                    '      C("Stop")\n' +
                    '    \n'
            },
            {
                img: simple_block_dia_with_column,
                dec: "A simple block diagram with column widths set",
                code:
                    'block-beta\n' +
                    '      columns 5\n' +
                    '      A B C:3\n' +
                    '      D:3 E:2\n' +
                    '    \n'
            },
        ],
    },
    {
        title: "C4 Diagram",
        content: [
            {
                img: c4_dia,
                dec: 'A C4 diagram',
                code: 'C4Context\n' +
                    '      title System Context diagram for Internet Banking System\n' +
                    '      Enterprise_Boundary(b0, "BankBoundary0") {\n' +
                    '        Person(customerA, "Banking Customer A", "A customer of the bank, with personal bank accounts.")\n' +
                    '        Person(customerB, "Banking Customer B")\n' +
                    '        Person_Ext(customerC, "Banking Customer C", "desc")\n' +
                    '\n' +
                    '        Person(customerD, "Banking Customer D", "A customer of the bank, <br/> with personal bank accounts.")\n' +
                    '\n' +
                    '        System(SystemAA, "Internet Banking System", "Allows customers to view information about their bank accounts, and make payments.")\n' +
                    '\n' +
                    '        Enterprise_Boundary(b1, "BankBoundary") {\n' +
                    '\n' +
                    '          SystemDb_Ext(SystemE, "Mainframe Banking System", "Stores all of the core banking information about customers, accounts, transactions, etc.")\n' +
                    '\n' +
                    '          System_Boundary(b2, "BankBoundary2") {\n' +
                    '            System(SystemA, "Banking System A")\n' +
                    '            System(SystemB, "Banking System B", "A system of the bank, with personal bank accounts. next line.")\n' +
                    '          }\n' +
                    '\n' +
                    '          System_Ext(SystemC, "E-mail system", "The internal Microsoft Exchange e-mail system.")\n' +
                    '          SystemDb(SystemD, "Banking System D Database", "A system of the bank, with personal bank accounts.")\n' +
                    '\n' +
                    '          Boundary(b3, "BankBoundary3", "boundary") {\n' +
                    '            SystemQueue(SystemF, "Banking System F Queue", "A system of the bank.")\n' +
                    '            SystemQueue_Ext(SystemG, "Banking System G Queue", "A system of the bank, with personal bank accounts.")\n' +
                    '          }\n' +
                    '        }\n' +
                    '      }\n' +
                    '\n' +
                    '      BiRel(customerA, SystemAA, "Uses")\n' +
                    '      BiRel(SystemAA, SystemE, "Uses")\n' +
                    '      Rel(SystemAA, SystemC, "Sends e-mails", "SMTP")\n' +
                    '      Rel(SystemC, customerA, "Sends e-mails to")\n' +
                    '\n' +
                    '      UpdateElementStyle(customerA, $fontColor="red", $bgColor="grey", $borderColor="red")\n' +
                    '      UpdateRelStyle(customerA, SystemAA, $textColor="blue", $lineColor="blue", $offsetX="5")\n' +
                    '      UpdateRelStyle(SystemAA, SystemE, $textColor="blue", $lineColor="blue", $offsetY="-10")\n' +
                    '      UpdateRelStyle(SystemAA, SystemC, $textColor="blue", $lineColor="blue", $offsetY="-40", $offsetX="-50")\n' +
                    '      UpdateRelStyle(SystemC, customerA, $textColor="red", $lineColor="red", $offsetX="-50", $offsetY="20")\n' +
                    '\n' +
                    '      UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")\n'

            },
        ],
    },
    {
        title: 'Class Diagram',
        content: [
            {
                img: class_seq_dia,
                dec: 'A class sequence diagram with inheritance',
                code: 'classDiagram\n' +
                    '    Animal <|-- Duck\n' +
                    '    Animal <|-- Fish\n' +
                    '    Animal <|-- Zebra\n' +
                    '    Animal : +int age\n' +
                    '    Animal : +String gender\n' +
                    '    Animal: +isMammal()\n' +
                    '    Animal: +mate()\n' +
                    '    class Duck{\n' +
                    '      +String beakColor\n' +
                    '      +swim()\n' +
                    '      +quack()\n' +
                    '    }\n' +
                    '    class Fish{\n' +
                    '      -int sizeInFeet\n' +
                    '      -canEat()\n' +
                    '    }\n' +
                    '    class Zebra{\n' +
                    '      +bool is_wild\n' +
                    '      +run()\n' +
                    '    }\n'
            },
            {
                img: class_dia,
                dec: 'A class diagram using cardinalities',
                code: 'classDiagram\n' +
                    '    %% Example showing the use of cardinalities\n' +
                    '\n' +
                    '    %% Defining the classes\n' +
                    '    class Company {\n' +
                    '        +String name\n' +
                    '        +String address\n' +
                    '        +hireEmployee(Employee)\n' +
                    '    }\n' +
                    '    class Employee {\n' +
                    '        +String firstName\n' +
                    '        +String lastName\n' +
                    '        +int employeeID\n' +
                    '        +workFor(Company)\n' +
                    '    }\n' +
                    '    class Project {\n' +
                    '        +String projectName\n' +
                    '        +Date projectDeadline\n' +
                    '        +addMember(Employee)\n' +
                    '    }\n' +
                    '\n' +
                    '    %% Defining the relationships with cardinalities\n' +
                    '    Company "1" --> "1..*" Employee : employs\n' +
                    '    Employee "1" --> "0..1" Company : works for\n' +
                    '    Employee "1..*" --> "1" Project : is involved in\n' +
                    '    Project "1" --> "0..*" Employee : has member\n' +
                    '\n' +
                    '    %% Adding a note to explain the diagram\n' +
                    '    note for Company "A Company employs one or more Employees."\n' +
                    '    note for Employee "An Employee may work for a Company and is involved in one Project."\n' +
                    '    note for Project "A Project has multiple Employees as members."\n' +
                    '\n' +
                    '    %% Applying CSS classes using shorthand notation\n' +
                    '    class Company:::companyStyle\n' +
                    '    class Employee:::employeeStyle\n' +
                    '    class Project:::projectStyle\n' +
                    '\n' +
                    '    %% Apply CSS classes using cssClass statement\n' +
                    '    %% cssClass "Company, Employee, Project" generalClass\n' +
                    '\n' +
                    '     style Company fill:#f9f,stroke:#333,stroke-width:4px\n' +
                    '     style Employee fill:#f9f,stroke:#333,stroke-width:4px\n' +
                    '     style Project fill:#263,stroke:#66f,stroke-width:2px,color:#fff,stroke-dasharray: 5 5\n'
            },
            {
                img: class_scheme_dia,
                dec: 'Class schema for an issue tracking system with inheritance and interfaces',
                code: 'classDiagram\n' +
                    '    class Issue {\n' +
                    '        <<Abstract>>\n' +
                    '        +int id\n' +
                    '        +String title\n' +
                    '        +String description\n' +
                    '        +Status status\n' +
                    '        +User assignedTo\n' +
                    '        +start()\n' +
                    '        +complete()\n' +
                    '    }\n' +
                    '\n' +
                    '    class Bug {\n' +
                    '        +Severity severity\n' +
                    '        +String report()\n' +
                    '    }\n' +
                    '\n' +
                    '    class Epic {\n' +
                    '        +String featureDetails\n' +
                    '        +requestApproval()\n' +
                    '    }\n' +
                    '\n' +
                    '    class Story {\n' +
                    '        +int EpicID\n' +
                    '    }\n' +
                    '\n' +
                    '    class Task {\n' +
                    '        +Date deadline\n' +
                    '    }\n' +
                    '\n' +
                    '    class User {\n' +
                    '        <<Abstract>>\n' +
                    '        +int userId\n' +
                    '        +String username\n' +
                    '        +String email\n' +
                    '        +login()\n' +
                    '        +logout()\n' +
                    '    }\n' +
                    '    \n' +
                    '    class Admin {\n' +
                    '        +manageUsers()\n' +
                    '        +viewAllTasks()\n' +
                    '    }\n' +
                    '\n' +
                    '    class RegularUser {\n' +
                    '        +viewAssignedTasks()\n' +
                    '        +updateTaskStatus()\n' +
                    '    }\n' +
                    '\n' +
                    '    class TaskManager {\n' +
                    '        <<interface>>\n' +
                    '        +assignTask()\n' +
                    '        +removeTask()\n' +
                    '        +updateTask()\n' +
                    '    }\n' +
                    '    TaskManager <|.. TaskApp\n' +
                    '\n' +
                    '    class TaskApp {\n' +
                    '        +assignTask()\n' +
                    '        +removeTask()\n' +
                    '        +updateTask()\n' +
                    '        +getAllTasks()\n' +
                    '    }\n' +
                    '\n' +
                    '    class Status {\n' +
                    '        <<enumeration>>\n' +
                    '        New\n' +
                    '        Open\n' +
                    '        In Progress\n' +
                    '        Postponed\n' +
                    '        Closed\n' +
                    '    }\n' +
                    '\n' +
                    '    class Severity {\n' +
                    '        <<enumeration>>\n' +
                    '        Critical\n' +
                    '        High\n' +
                    '        Medium\n' +
                    '        Low\n' +
                    '    }\n' +
                    '\n' +
                    '    Issue "1" -->  User : assignedTo\n' +
                    '    Issue "1" --> Status : has\n' +
                    '    Bug "1" --> Severity : has\n' +
                    '    Issue <|-- Bug : Inheritance\n' +
                    '    Issue <|-- Epic : Inheritance\n' +
                    '    Issue <|-- Task : Inheritance\n' +
                    '    Issue <|-- Story : Inheritance\n' +
                    '    Epic "0" --> "many" Story\n' +
                    '    User <|-- Admin\n' +
                    '    User <|-- RegularUser\n' +
                    '    \n' +
                    '    style Issue fill:#bfb,stroke:#6f6,stroke-width:2px,color:#000,stroke-dasharray: 5 5\n' +
                    '    style User fill:#bfb,stroke:#6f6,stroke-width:2px,color:#000,stroke-dasharray: 5 5\n' +
                    '    style TaskManager fill:#9ff,stroke:#369,stroke-width:2px,color:#000,stroke-dasharray: 5 5\n' +
                    '    style Status fill:#ffb,stroke:#663,stroke-width:2px,color:#000,stroke-dasharray: 5 5\n' +
                    '    style Severity fill:#ffb,stroke:#663,stroke-width:2px,color:#000,stroke-dasharray: 5 5\n'
            }
        ]
    },
    {
        title: 'ER Diagram',
        content: [
            {
                img: er_dia,
                dec: 'An entity relationship diagram',
                code: 'erDiagram\n' +
                    '    CUSTOMER }|..|{ DELIVERY-ADDRESS : has\n' +
                    '    CUSTOMER ||--o{ ORDER : places\n' +
                    '    CUSTOMER ||--o{ INVOICE : "liable for"\n' +
                    '    DELIVERY-ADDRESS ||--o{ ORDER : receives\n' +
                    '    INVOICE ||--|{ ORDER : covers\n' +
                    '    ORDER ||--|{ ORDER-ITEM : includes\n' +
                    '    PRODUCT-CATEGORY ||--|{ PRODUCT : contains\n' +
                    '    PRODUCT ||--o{ ORDER-ITEM : "ordered in"\n'
            }
        ]

    },
    {
        title: 'Flowchart',
        content: [
            {
                img: flow_chart_with_icon,
                dec: 'A flowchart with an icon',
                code: 'flowchart LR\n' +
                    '  A[Start] --Some text--> B(Continue)\n' +
                    '  B --> C{Evaluate}\n' +
                    '  C -- One --> D[Option 1]\n' +
                    '  C -- Two --> E[Option 2]\n' +
                    '  C -- Three --> F[fa:fa-car Option 3]\n'
            },
            {
                img: simple_flowcharts_showing_bug_ticketing,
                dec: 'A simple flowchart showing bug ticketing process',
                code: 'flowchart LR\n' +
                    '  classDef redNode fill:#D50000,color:#000000;\n' +
                    '  classDef pinkNode fill:#E1BEE7,color:#000000;\n' +
                    '  classDef yellowNode fill:#FFF9C4,color:#000000;\n' +
                    '  classDef blackNode fill:#000000,stroke:#FFD600,stroke-width:4px,stroke-dasharray: 0,color:#FFFFFF;\n' +
                    '  classDef greenNode fill:#00F840,color:#000000;\n' +
                    '  classDef reminderNode stroke:#FFD600,stroke-width:4px,stroke-dasharray: 0,fill:#000000,color:#FFFFFF;\n' +
                    '  classDef blueSubgraph fill:#BBDEFB;\n' +
                    '\n' +
                    '  subgraph subgraph_zv2q8ucnp["Shape descriptions"]\n' +
                    '      customer((Customer)):::redNode\n' +
                    '      Support["Support"]:::pinkNode\n' +
                    '      Technician{{Technician}}:::yellowNode\n' +
                    '      Decision{"Decision"}:::blackNode\n' +
                    '  end\n' +
                    '\n' +
                    '  A((Reported issue)):::redNode --> B["Ticket is created"]\n' +
                    '  B --> C{"Working hours?"}:::blackNode\n' +
                    '  C -- Yes --> E{{"Tickets are sent to day team for response"}}:::yellowNode\n' +
                    '  C -- No --> F["Tickets are sent to on-call staff for response"]:::pinkNode\n' +
                    '  E --> Worked{"Ticket being worked on?"}:::reminderNode\n' +
                    '  F --> Worked\n' +
                    '  Worked -- Yes --> G["Work on the tickets based on priority"]:::pinkNode\n' +
                    '  Worked -- No --> Reminder["Reminder is sent"]\n' +
                    '  Reminder --> Worked\n' +
                    '  G --> H["Team fixes the issue"]:::pinkNode\n' +
                    '  H --> I{"Is the issue resolved?"}:::reminderNode\n' +
                    '  I -- Yes --> Done["Ticket is closed and follow-up email is sent"]:::greenNode\n' +
                    '  I -- No --> H\n' +
                    '\n' +
                    '  class subgraph_zv2q8ucnp blueSubgraph\n' +
                    '\n' +
                    '  linkStyle 2 stroke:#00C853,fill:none\n' +
                    '  linkStyle 3 stroke:#D50000,fill:none\n' +
                    '  linkStyle 6 stroke:#00C853,fill:none\n' +
                    '  linkStyle 7 stroke:#D50000,fill:none\n' +
                    '  linkStyle 11 stroke:#00C853,fill:none\n' +
                    '  linkStyle 12 stroke:#D50000,fill:none\n'
            },
            {
                img: project_planning_dia,
                dec: 'A simple project planning flowchart',
                code: 'flowchart TD\n' +
                    '%% Nodes\n' +
                    'A("Project Idea"):::green\n' +
                    'B("Initial Planning"):::orange\n' +
                    'C("Detailed Design <br> & <br> Requirements"):::blue\n' +
                    'D{"Decision: Continue or Stop?"}:::yellow\n' +
                    'E("Development Phase"):::pink\n' +
                    'F("Testing Phase"):::purple\n' +
                    'G("Deployment"):::green\n' +
                    'H("Feedback and Improvement"):::orange\n' +
                    '\n' +
                    '%% Edges\n' +
                    'A --> B --> C --> D\n' +
                    'D -- Continue --> E --> F --> G\n' +
                    'D -- Stop --> H\n' +
                    'G --> H\n' +
                    'H --> B\n' +
                    '\n' +
                    '%% Styling\n' +
                    'classDef green fill:#B2DFDB,stroke:#00897B,stroke-width:2px;\n' +
                    'classDef orange fill:#FFE0B2,stroke:#FB8C00,stroke-width:2px;\n' +
                    'classDef blue fill:#BBDEFB,stroke:#1976D2,stroke-width:2px;\n' +
                    'classDef yellow fill:#FFF9C4,stroke:#FBC02D,stroke-width:2px;\n' +
                    'classDef pink fill:#F8BBD0,stroke:#C2185B,stroke-width:2px;\n' +
                    'classDef purple fill:#E1BEE7,stroke:#8E24AA,stroke-width:2px;\n'
            },
            {
                img: flow_chart_showing_the_carbon,
                dec: 'A simple, clean flowchart showing the carbon cycle',
                code: 'flowchart TB\n' +
                    '  A("CO2 cycle") --> B("Photosynthesis")\n' +
                    '  B --> E("Organic carbon") & n3("Decay organism")\n' +
                    '  n1("Sunlight") --> B\n' +
                    '  n3 --> nb("Dead organisms and waste product")\n' +
                    '  nb --> n5("Root respiration") & ng("Fossil fuels")\n' +
                    '  n5 --> nl("Factory emission")\n' +
                    '  nl --> A\n' +
                    '  nn("Animal respiration") --> A\n' +
                    '  style A stroke:#000000,fill:#E1F0D4 \n' +
                    '  style B stroke:#000000,fill:#C3EFE0 \n' +
                    '  style E stroke:#000000,fill:#F6ACD8\n' +
                    '  style n3 stroke:#000000,fill:#C2C4B3 \n' +
                    '  style n1 stroke:#000000,fill:#F2F7D2 \n' +
                    '  style nb stroke:#000000,fill:#E9A3B2 \n' +
                    '  style n5 stroke:#000000,fill:#DBCDF8 \n' +
                    '  style ng stroke:#000000,fill:#BEF6AC \n' +
                    '  style nl stroke:#000000,fill:#A3E9CC \n' +
                    '  style nn stroke:#000000,fill:#D4EFF0\n'
            },
            {
                img: flowchart_showing_the_brewing_process,
                dec: 'Large flowchart showing the brewing process, using elk renderer',
                code: 'flowchart-elk\n' +
                    '  A{"What type \n' +
                    '    of beer \n' +
                    '    do you want \n' +
                    '    to brew?"} --> na["Lager"] & nk["Belgian"] & np["Stout"] & nd["IPA"]\n' +
                    '  na --> n8["Hops: \n' +
                    '  Saaz, \n' +
                    '  Tettnanger, \n' +
                    '  Spalter, \n' +
                    '  Hallertauer Mittelfrüh"] & nu["Malt: \n' +
                    '  Lager Malt"]\n' +
                    '  nk --> ns["Hops: \n' +
                    '  Saaz, \n' +
                    '  Hallertau, \n' +
                    '  Tettnang,\n' +
                    '  Styrian Goldings"] & n9["Malt:\n' +
                    '  Pilsen 6RH"] & nq["Extras:\n' +
                    '  Fruit puree,\n' +
                    '  Caramel Sugar\n' +
                    '  Anything you like"]\n' +
                    '  np --> nf["Hops:\n' +
                    '  Saaz,\n' +
                    '  Fuggle"] & nl["Malt:\n' +
                    '  Pale Ale,\n' +
                    '  Dark malt,\n' +
                    '  Chocolate Malt"]\n' +
                    '  nd --> n0["Hops:\n' +
                    '  Citra,\n' +
                    '  Mosaic,\n' +
                    '  Simcoe,\n' +
                    '  Amarillo"] & nv["Malt:\n' +
                    '  Maris Otter,\n' +
                    '  2-row, \n' +
                    '  Ale malt"]\n' +
                    '  nl --> no["Time to start brewing!"]\n' +
                    '  nf --> no\n' +
                    '  n0 --> no\n' +
                    '  nv --> no\n' +
                    '  nq --> no\n' +
                    '  n9 --> no\n' +
                    '  ns --> no\n' +
                    '  nu --> no\n' +
                    '  n8 --> no\n' +
                    '  nc["So you decided to brew a beer? Great!"] --> nb["Take stock of your equipment"]\n' +
                    '  nb --> ni["Do you have everything you need?"]\n' +
                    '  ni --> n3["What are you missing?"]\n' +
                    '  n3 -- Carbonation sugar --> n7["You can skip that for\n' +
                    '   now but make sure to order it, \n' +
                    '   you\'ll need it in a few weeks"]\n' +
                    '  n3 -- Bottle Caps --> n7\n' +
                    '  n3 -- Bottles --> n7\n' +
                    '  n3 -- Sanitizing agent --> nw["Buy it now"]\n' +
                    '  n3 -- A large pot --> nw\n' +
                    '  n7 --> A\n' +
                    '  n3 -- Thermometer --> nw\n' +
                    '  ni -- Yes --> A\n' +
                    '  n3 -- Fermentation Vessel --> nw\n' +
                    '  nw --> A\n' +
                    '  no --> nr["Mashing"]\n' +
                    '  nr --> n5["Wort Boiling"] & nx["Add water to the pot \n' +
                    '  and heat to the desired \n' +
                    '  temperature + 3-4 degrees"]\n' +
                    '  n5 --> n1["Fermentation"] & ny["Bring the wort to a boil"]\n' +
                    '  n1 --> n4["Tapping"] & nj["Add the cooled wort \n' +
                    '  to your fermentation vessel"]\n' +
                    '  nx --> nh["Place the malt in a bag and \n' +
                    '  soak    for 60 minutes"]\n' +
                    '  nh --> ng["Place the bag with \n' +
                    '  mash in a sieve over the pot"]\n' +
                    '  ng --> n68q["Pour heated water through \n' +
                    '  the mash into the pot until \n' +
                    '  the desired quantity of \n' +
                    '  liquid is in the pot"]\n' +
                    '  n68q --> n5\n' +
                    '  ny --> n2["Add 13g of hops \n' +
                    '  after 15 minutes"]\n' +
                    '  n2 --> n6["Boil for 30 minutes \n' +
                    '  and then add 13g of hops"]\n' +
                    '  n6 --> nt["Boil for ten minutes \n' +
                    '  and add 13g of hops"]\n' +
                    '  nt --> ne["Boil for five minutes \n' +
                    '  and add the pot to a \n' +
                    '  large container of \n' +
                    '  iced water to cool"]\n' +
                    '  ne --> n1\n' +
                    '  nj --> nn["Let ferment for 14 days"]\n' +
                    '  nn --> n4\n' +
                    '  n4 --> nz["Add beer and 3g of \n' +
                    '  sugar to the desired \n' +
                    '  quantity of bottles"]\n' +
                    '  nz --> nc0f["Carbonate for 14 days"]\n' +
                    '  nc0f --> nc3d["Cool and Enjoy"]\n' +
                    '  style na stroke:#00C853,fill:#C8E6C9\n' +
                    '  style nk stroke:#FFD600,fill:#FFF9C4\n' +
                    '  style np stroke:#FFD600,fill:#FFF9C4\n' +
                    '  style nd stroke:#FFD600,fill:#FFF9C4\n' +
                    '  style n8 stroke:#00C853,fill:#C8E6C9\n' +
                    '  style nu stroke:#00C853,fill:#C8E6C9\n' +
                    '  style ns stroke:#FFD600,fill:#FFF9C4\n' +
                    '  style n9 stroke:#FFD600,fill:#FFF9C4\n' +
                    '  style nq stroke:#FFD600,fill:#FFF9C4\n' +
                    '  style nf stroke:#FFD600,fill:#FFF9C4\n' +
                    '  style nl fill:#FFF9C4,stroke:#FFD600\n' +
                    '  style n0 stroke:#FFD600,fill:#FFF9C4\n' +
                    '  style nv stroke:#FFD600,fill:#FFF9C4\n' +
                    '  style no stroke:#00C853,fill:#C8E6C9\n' +
                    '  style nr fill:#E1BEE7\n' +
                    '  style n5 fill:#BBDEFB\n' +
                    '  style nx fill:#E1BEE7\n' +
                    '  style n1 fill:#FFE0B2\n' +
                    '  style ny fill:#BBDEFB\n' +
                    '  style n4 fill:#FFF9C4\n' +
                    '  style nj fill:#FFE0B2\n' +
                    '  style nh fill:#E1BEE7\n' +
                    '  style ng fill:#E1BEE7\n' +
                    '  style n68q fill:#E1BEE7\n' +
                    '  style n2 fill:#BBDEFB\n' +
                    '  style n6 fill:#BBDEFB\n' +
                    '  style nt fill:#BBDEFB\n' +
                    '  style ne fill:#BBDEFB\n' +
                    '  style nn fill:#FFE0B2\n' +
                    '  style nz fill:#FFF9C4\n' +
                    '  style nc0f stroke:#BBDEFB,fill:#FFF9C4\n' +
                    '  style nc3d fill:#C8E6C9\n'
            },
            {
                img: flow_chart_dia_with_multi_decisions,
                dec: 'An flowchart with multiple decision points and color formatting',
                code: 'flowchart TD\n' +
                    '  A(("You have decided to play a game tonight")) --> n8(["Great!!!"])\n' +
                    '  ny{{"Are you going to play alone?"}} -- Yes --> nq{{"Singleplayer games"}}\n' +
                    '  n8 --> np("Start your computer")\n' +
                    '  np --> ny\n' +
                    '  n7("Are your friends online?") -- Yes --> nw("Do they wanna play?")\n' +
                    '  nq --> nc{{"Time to pick the game"}}\n' +
                    '  n7 -- No --> nq\n' +
                    '  nw -- No --> nq\n' +
                    '  nw -- Yes --> n2("time to pick the game")\n' +
                    '  n2 --> n1("World of Warcraft") & n9("StarCraft") & nj("League of legends") & ns("DOTA 2") & nu("Minecraft")\n' +
                    '  nc --> ni{{"DOOM"}} & nk{{"Baldurs Gate 3"}} & nb{{"Fallout new vegas"}} & n0{{"Witcher"}} & nl{{"Sims"}}\n' +
                    '  nl --> nf[["Now that you have picked a game"]]\n' +
                    '  n0 --> nf\n' +
                    '  nb --> nf\n' +
                    '  nk --> nf\n' +
                    '  ni --> nf\n' +
                    '  n1 --> no[["Now that you have picked a game"]]\n' +
                    '  n9 --> no\n' +
                    '  nj --> no\n' +
                    '  ns --> no\n' +
                    '  nu --> no\n' +
                    '  nf --> nd{"Great have fun!"}\n' +
                    '  no --> nd\n' +
                    '  ny -- No --> n7\n' +
                    '  np --> n7\n' +
                    '  style A fill:#C8E6C9,stroke-width:4px,stroke-dasharray: 0,stroke:#00C853\n' +
                    '  style n8 stroke-width:4px,stroke-dasharray: 0,fill:#C8E6C9,stroke:#00C853\n' +
                    '  style ny stroke-width:4px,stroke-dasharray: 0,stroke:#FF6D00,fill:#FFE0B2\n' +
                    '  style nq stroke-width:4px,stroke-dasharray: 0,stroke:#FF6D00,fill:#FFE0B2\n' +
                    '  style np stroke:#00C853,stroke-width:4px,stroke-dasharray: 0\n' +
                    '  style n7 stroke-width:4px,stroke-dasharray: 0,fill:#BBDEFB,stroke:#2962FF\n' +
                    '  style nw stroke-width:4px,stroke-dasharray: 0,stroke:#2962FF,fill:#BBDEFB\n' +
                    '  style nc stroke-width:4px,stroke-dasharray: 0,stroke:#FF6D00,fill:#FFE0B2\n' +
                    '  style n2 stroke-width:4px,stroke-dasharray: 0,fill:#BBDEFB,stroke:#2962FF\n' +
                    '  style n1 stroke-width:4px,stroke-dasharray: 0,fill:#BBDEFB,stroke:#2962FF\n' +
                    '  style n9 stroke-width:4px,stroke-dasharray: 0,fill:#BBDEFB,stroke:#2962FF\n' +
                    '  style nj stroke-width:4px,stroke-dasharray: 0,fill:#BBDEFB,stroke:#2962FF\n' +
                    '  style ns stroke-width:4px,stroke-dasharray: 0,fill:#BBDEFB,stroke:#2962FF\n' +
                    '  style nu stroke-width:4px,stroke-dasharray: 0,fill:#BBDEFB,stroke:#2962FF\n' +
                    '  style ni stroke-width:4px,stroke-dasharray: 0,fill:#FFE0B2,stroke:#FF6D00\n' +
                    '  style nk stroke-width:4px,stroke-dasharray: 0,stroke:#FF6D00,fill:#FFE0B2\n' +
                    '  style nb stroke-width:4px,stroke-dasharray: 0,stroke:#FF6D00,fill:#FFE0B2\n' +
                    '  style n0 stroke-width:4px,stroke-dasharray: 0,stroke:#FF6D00,fill:#FFE0B2\n' +
                    '  style nl stroke-width:4px,stroke-dasharray: 0,stroke:#FF6D00,fill:#FFE0B2\n' +
                    '  style nf stroke:#AA00FF,stroke-width:4px,stroke-dasharray: 0,fill:#E1BEE7\n' +
                    '  style no stroke-width:4px,stroke-dasharray: 0,fill:#E1BEE7,stroke:#AA00FF\n' +
                    '  style nd stroke-width:4px,stroke-dasharray: 0,stroke:#AA00FF,fill:#C8E6C9\n'
            },
            {
                img: ex_flowchart_for_selecting_statistical,
                dec: 'An example flowchart for selecting a statistical analysis test',
                code: 'flowchart TD\n' +
                    '  F{"Which statistical test is most appropriate?"} --> na["Frequencies"] & nh["Measured values"]\n' +
                    '  na --> n1["Chi2-test"]\n' +
                    '  nh --> nk{"Difference between \n' +
                    '  the average values \n' +
                    '  of the data?"} & n5{"Influence between \n' +
                    '  variables?"}\n' +
                    '  nk --> nx{"Comparison with \n' +
                    '  a measured value?"} & nd{"Comparison between \n' +
                    '  groups?"}\n' +
                    '  nx -- Normally distributed data --> nc["T-test"]\n' +
                    '  nx -- Non-normally distributed data --> nw["Wilcoxon-test"]\n' +
                    '  nd --> ne{"Between 2 groups?"} & nu{"More than 2 groups?"}\n' +
                    '  ne --> n6{"Is the data \n' +
                    '  dependent?"} & nq{"Is the data \n' +
                    '  independent?"}\n' +
                    '  n6 -- Normally distributed data --> np["Paired T-test"]\n' +
                    '  n6 -- Non-normally distributed data --> ng["Paired Wilcoxon-test"]\n' +
                    '  nq -- Normally distributed data --> n8["Two-sample T-test"]\n' +
                    '  nq -- Non-normally distributed data --> n0["Two-sample Wilcoxon-test"]\n' +
                    '  n5 --> n9{"Covariation?"} & n3{"Influence?"}\n' +
                    '  n9 -- Normally distributed data --> n4["Pearson correlation test"]\n' +
                    '  n9 -- Non-normally distributed data --> ni["Spearman correlation test"]\n' +
                    '  n3 --> nm{"Linear?"} & n7{"Non-linear?"}\n' +
                    '  nm --> nf["Linear regression"]\n' +
                    '  n7 --> ns["Non-linear regression"]\n' +
                    '  nu --> nn{"One factor?"} & ny{"Complex \n' +
                    '  design?"}\n' +
                    '  nn -- Normally distributed data --> nj["One-way ANOVA"]\n' +
                    '  nn -- Non-normally distributed data --> nt["Kruskal-Wallis test"]\n' +
                    '  ny --> nv{"Two factors?"} & no{"One factor \n' +
                    '  and two \n' +
                    '  variables?"}\n' +
                    '  no --> nr["ANCOVA"]\n' +
                    '  nv --> nz{"Are both \n' +
                    '  independent \n' +
                    '  measurements?"} & n2{"A factor with \n' +
                    '  dependent \n' +
                    '  measurements?"}\n' +
                    '  nz --> nl["Two-ways ANOVA"]\n' +
                    '  n2 -- Normally distributed data --> n2zm["Repeated-measures \n' +
                    '  one-way-ANOVA"]\n' +
                    '  n2 -- Non-normally distributed data --> n0nv["Friedman test"]\n' +
                    '  style F fill:#BBDEFB\n' +
                    '  style na fill:#BDD7E3\n' +
                    '  style nh fill:#BDD7E3\n' +
                    '  style n1 fill:#BECCDB\n' +
                    '  style nk fill:#CCEBE5\n' +
                    '  style n5 fill:#CCEBE5\n' +
                    '  style nx fill:#51B29F\n' +
                    '  style nd fill:#51B29F\n' +
                    '  style nc fill:#BECCDB\n' +
                    '  style nw fill:#BECCDB\n' +
                    '  style ne fill:#79D0A5\n' +
                    '  style nu fill:#79D0A5\n' +
                    '  style n6 fill:#ADE7C3\n' +
                    '  style nq fill:#ADE7C3\n' +
                    '  style np fill:#BECCDB\n' +
                    '  style ng fill:#BECCDB\n' +
                    '  style n8 fill:#BECCDB\n' +
                    '  style n0 fill:#BECCDB\n' +
                    '  style n9 fill:#9EDFDA\n' +
                    '  style n3 fill:#9EDFDA\n' +
                    '  style n4 fill:#BECCDB\n' +
                    '  style ni fill:#BECCDB\n' +
                    '  style nm fill:#7FB9AE\n' +
                    '  style n7 fill:#7FB9AE\n' +
                    '  style nf fill:#BECCDB\n' +
                    '  style ns fill:#BECCDB\n' +
                    '  style nn fill:#B7D3BE\n' +
                    '  style ny fill:#B7D3BE\n' +
                    '  style nj fill:#BECCDB\n' +
                    '  style nt fill:#BECCDB\n' +
                    '  style nv fill:#A1E1A6\n' +
                    '  style no fill:#A1E1A6\n' +
                    '  style nr fill:#BECCDB\n' +
                    '  style nz fill:#92BF95\n' +
                    '  style n2 fill:#92BF95\n' +
                    '  style nl fill:#BECCDB\n' +
                    '  style n2zm fill:#BECCDB\n' +
                    '  style n0nv fill:#BECCDB\n'
            },
            {
                img: flow_chart_with_shapes,
                dec: 'A flowchart with many different shapes',
                code: 'flowchart LR\n' +
                    'box[box] -->\n' +
                    'rounded(rounded) -->\n' +
                    'stadium([stadium]) -->\n' +
                    'subroutine[[subroutine]] -->\n' +
                    'cylindrical[(cylindrical)] -->\n' +
                    'circle((circle))\n' +
                    'box2[box2] -->\n' +
                    'asymmetric>asymmetric] -->\n' +
                    'rhombus{rhombus} -->\n' +
                    'hexagon{{hexagon}} -->\n' +
                    'parallelogram[/parallelogram/]  -->\n' +
                    'parallelogramAlt[\\parallelogramAlt\\]\n' +
                    'box3-->\n' +
                    'trapezoid[/trapezoid\\] -->\n' +
                    'trapezoidAlt[\\TrapezoidAlt/] -->\n' +
                    'last\n' +
                    '\n'
            },
            {
                img: flow_chart_dia_with_circle_arrows,
                dec: 'A flowchart with cross and circle arrow types',
                code: 'flowchart LR\n' +
                    '    A --o B\n' +
                    '    B --x C\n' +
                    '\n'
            },
            {
                img: flowchart_going_from_top_to_bottom,
                dec: 'A flowchart going from the top to the bottom',
                code: 'flowchart TB\n' +
                    '    A[Start] --Some text--> B(Continue)\n' +
                    '    B --> C{Evaluate}\n' +
                    '    C -- One --> D[Option 1]\n' +
                    '    C -- Two --> E[Option 2]\n' +
                    '    C -- Three --> F[fa:fa-car Option 3]\n'
            },
            {
                img: flowcrat_with_eff_dia,
                dec: 'A flowchart with efficient but perhaps not so readable syntax',
                code: 'flowchart\n' +
                    '    A --> B & C & D --> E & F --> G\n'
            },
            {
                img: flow_chart_with_subgraphs,
                dec: 'A flowchart with subgraphs',
                code: 'flowchart LR\n' +
                    '  subgraph TOP\n' +
                    '    direction TB\n' +
                    '    subgraph B1\n' +
                    '        direction RL\n' +
                    '        i1 -->f1\n' +
                    '    end\n' +
                    '    subgraph B2\n' +
                    '        direction BT\n' +
                    '        i2 -->f2\n' +
                    '    end\n' +
                    '  end\n' +
                    '  A --> TOP --> B\n' +
                    '  B1 --> B2\n'
            },
            {
                img: flow_chart_dia_with_classes,
                dec: 'A flowchart with classes and styles',
                code: 'flowchart LR\n' +
                    '    A:::someclass --> B\n' +
                    '    id1(Start)-->id2(Stop)\n' +
                    '    style id1 fill:#f9f,stroke:#333,stroke-width:4px\n' +
                    '    style id2 fill:#bbf,stroke:#f66,stroke-width:2px,color:#fff,stroke-dasharray: 5 5\n' +
                    '    classDef someclass fill:#f96\n'
            },
            {
                img: flow_chart_dia_with_multi_dir_arrows,
                dec: 'A flowchart with multi-directional arrows',
                code: 'flowchart LR\n' +
                    '    A o--o B\n' +
                    '    B <--> C\n' +
                    '    C x--x D\n' +
                    '\n'
            },
            {
                img: flow_chart_dia_with_multi_dir_arrows,
                dec: 'A flowchart with multi-directional arrows',
                code: 'flowchart LR\n' +
                    '    A o--o B\n' +
                    '    B <--> C\n' +
                    '    C x--x D\n' +
                    '\n'
            },
            {
                img: flow_chart_dia_with_arrows,
                dec: 'A flowchart with different types of arrows',
                code: 'flowchart\n' +
                    'a---a1\n' +
                    'a----a2\n' +
                    'a-----a3\n' +
                    'b-->b1\n' +
                    'b--->b2\n' +
                    'b---->b3\n' +
                    'c===c1\n' +
                    'c====c2\n' +
                    'c=====c3\n' +
                    'd==>d1\n' +
                    'd===>d2\n' +
                    'd====>d3\n' +
                    'e-.-e1\n' +
                    'e-..-e2\n' +
                    'e-...-e3\n' +
                    'f-.->f1\n' +
                    'f-..->f2\n' +
                    'f-...->f3\n' +
                    '\n'
            },
            {
                img: flow_chart_dia,
                dec: 'A flowchart with different types of arrows',
                code: 'flowchart\n' +
                    '    A{{"Kolb\'s four stages of learning"}} --> n8("Concrete experience (CE): feeling") & nl("Reflective Observation (RO): watching") & n6("Abstract Conceptualizing (AC): thinking") & ng("Active experimentation (AE): doing")\n' +
                    '    n8 --> nb(["Doing / having an experience"])\n' +
                    '    nl --> n9(["Reviewing / reflecting on the experience / processing"])\n' +
                    '    n6 --> n7(["Concluding / learning from the experience"])\n' +
                    '    ng --> np(["Planning / trying out what you have learned"])\n' +
                    '    style A stroke:#000000,fill:#69C3D7\n' +
                    '    style n8 stroke:#000000,fill:#69D7A7\n' +
                    '    style nl stroke:#000000,fill:#9498F8\n' +
                    '    style n6 stroke:#000000,fill:#EECF8F\n' +
                    '    style ng stroke:#000000,fill:#F19A7B\n' +
                    '    style nb fill:#D4EFDF ,stroke:#000000\n' +
                    '    style n9 stroke:#000000,fill:#BABCF1\n' +
                    '    style n7 stroke:#000000,fill:#F7E8CA\n' +
                    '    style np stroke:#000000,fill:#F5C9BA\n' +
                    '\n'
            },
        ]
    },
    {
        title: 'Gantt Chart',
        content: [
            {
                img: reg_gantt_chart,
                dec: 'A regular gantt chart with a task dependent on another task',
                code: 'gantt\n' +
                    '    title A Gantt Diagram\n' +
                    '    dateFormat  YYYY-MM-DD\n' +
                    '    section Section\n' +
                    '    A task           :a1, 2014-01-01, 30d\n' +
                    '    Another task     :after a1  , 20d\n' +
                    '    section Another\n' +
                    '    Task in sec      :2014-01-12  , 12d\n' +
                    '    another task      : 24d\n'
            },
            {
                img: gantt_chart_dia,
                dec: 'A gantt chart with milestone',
                code: 'gantt\n' +
                    '    dateFormat HH:mm\n' +
                    '    axisFormat %H:%M\n' +
                    '    Initial milestone : milestone, m1, 17:49, 2m\n' +
                    '    Task A : 10m\n' +
                    '    Task B : 5m\n' +
                    '    Final milestone : milestone, m2, 18:08, 4m\n'
            }
        ]
    },
    {
        title: 'Git Graph',
        content: [
            {
                img: basic_git_dia,
                dec: 'A basic git graph diagram',
                code: 'gitGraph\n' +
                    '        commit\n' +
                    '        commit\n' +
                    '        branch develop\n' +
                    '        checkout develop\n' +
                    '        commit\n' +
                    '        commit\n' +
                    '        checkout main\n' +
                    '        merge develop\n' +
                    '        commit\n' +
                    '        commit\n'
            },
            {
                img: basic_git_graph_dia,
                dec: 'A git graph diagram with tags',
                code: 'gitGraph\n' +
                    '          commit\n' +
                    '          commit id: "Normal" tag: "v1.0.0"\n' +
                    '          commit\n' +
                    '          commit id: "Reverse" type: REVERSE tag: "RC_1"\n' +
                    '          commit\n' +
                    '          commit id: "Highlight" type: HIGHLIGHT tag: "8.8.4"\n' +
                    '          commit\n'
            }, {
                img: ver_git_dia,
                dec: 'A vertical git graph diagram',
                code: 'gitGraph TB:\n' +
                    '          commit\n' +
                    '          commit\n' +
                    '          branch develop\n' +
                    '          commit\n' +
                    '          commit\n' +
                    '          checkout main\n' +
                    '          commit\n' +
                    '          commit\n' +
                    '          merge develop\n' +
                    '          commit\n' +
                    '          commit\n'
            }
        ]
    },
    {
        title: 'Mindmap',
        content: [
            {
                img: mindmap_dia,
                dec: 'A mindmap',
                code: 'mindmap\n' +
                    '  root((mindmap))\n' +
                    '    Origins\n' +
                    '      Long history\n' +
                    '      ::icon(fa fa-book)\n' +
                    '      Popularization\n' +
                    '        British popular psychology author Tony Buzan\n' +
                    '    Research\n' +
                    '      On effectiveness<br/>and features\n' +
                    '      On Automatic creation\n' +
                    '        Uses\n' +
                    '            Creative techniques\n' +
                    '            Strategic planning\n' +
                    '            Argument mapping\n' +
                    '    Tools\n' +
                    '      Pen and paper\n' +
                    '      Mermaid\n'
            }
        ]
    },
    {
        title: 'Pie Chart',
        content: [
            {
                img: pie_chart_dia,
                dec: 'A pie chart',
                code: 'pie title Pets adopted by volunteers\n' +
                    '    "Dogs" : 386\n' +
                    '    "Cats" : 85\n' +
                    '    "Rats" : 15\n'
            },
            {
                img: pei_dia_with_data,
                dec: 'A pie chart with data & custom styling',
                code: '%%{init: {"pie": {"textPosition": 0.5}, "themeVariables": {"pieOuterStrokeWidth": "5px"}} }%%\n' +
                    'pie showData\n' +
                    '    title Key elements in Product X\n' +
                    '    "Calcium" : 42.96\n' +
                    '    "Potassium" : 50.05\n' +
                    '    "Magnesium" : 10.01\n' +
                    '    "Iron" :  5\n'
            },
        ]
    },
    {
        title: 'Quadrant Chart',
        content: [
            {
                img: sample_quadrant_dia,
                dec: 'A sample quadrant chart',
                code: 'quadrantChart\n' +
                    '    title Reach and engagement of campaigns\n' +
                    '    x-axis Low Reach --> High Reach\n' +
                    '    y-axis Low Engagement --> High Engagement\n' +
                    '    quadrant-1 We should expand\n' +
                    '    quadrant-2 Need to promote\n' +
                    '    quadrant-3 Re-evaluate\n' +
                    '    quadrant-4 May be improved\n' +
                    '    Campaign A: [0.3, 0.6]\n' +
                    '    Campaign B: [0.45, 0.23]\n' +
                    '    Campaign C: [0.57, 0.69]\n' +
                    '    Campaign D: [0.78, 0.34]\n' +
                    '    Campaign E: [0.40, 0.34]\n' +
                    '    Campaign F: [0.35, 0.78]\n' +
                    '\n'
            },
            {
                img: experiment_choice_dia,
                dec: 'Experiment choice - Template\n' +
                    '\n',
                code: 'quadrantChart\n' +
                    '    title Cost and Results of experiments\n' +
                    '    x-axis Low Cost --> High Cost\n' +
                    '    y-axis Low Reliability --> High Reliability\n' +
                    '    quadrant-1 Consider\n' +
                    '    quadrant-2 Preferred\n' +
                    '    quadrant-3 Modify\n' +
                    '    quadrant-4 Avoid\n' +
                    '    Passive Observation: [0.13, 0.3]\n' +
                    '    Field experiment: [0.4, 0.7]\n' +
                    '    Small scale lab work: [0.4, 0.42]\n' +
                    '    Lab work - Frequent repetition: [0.82, 0.85]\n' +
                    '    Large scale study: [0.8, 0.15]\n' +
                    '    Low impact study: [0.67, 0.56]\n' +
                    '\n' +
                    '\n'
            },

        ]
    },
    {
        title: 'Requirement Diagram',
        content: [
            {
                img: basic_req_dia,
                dec: 'A basic requirement diagram',
                code: 'requirementDiagram\n' +
                    '    requirement test_req {\n' +
                    '    id: 1\n' +
                    '    text: the test text.\n' +
                    '    risk: high\n' +
                    '    verifyMethod: test\n' +
                    '    }\n' +
                    '    element test_entity {\n' +
                    '    type: simulation\n' +
                    '    }\n' +
                    '    test_entity - satisfies -> test_req\n' +
                    '  \n'
            },
            {
                img: complex_req_dia,
                dec: 'A complex requirement diagram with different types of requirements',
                code: 'requirementDiagram\n' +
                    '\n' +
                    '    requirement test_req {\n' +
                    '    id: 1\n' +
                    '    text: the test text.\n' +
                    '    risk: high\n' +
                    '    verifyMethod: test\n' +
                    '    }\n' +
                    '\n' +
                    '    functionalRequirement test_req2 {\n' +
                    '    id: 1.1\n' +
                    '    text: the second test text.\n' +
                    '    risk: low\n' +
                    '    verifyMethod: inspection\n' +
                    '    }\n' +
                    '\n' +
                    '    performanceRequirement test_req3 {\n' +
                    '    id: 1.2\n' +
                    '    text: the third test text.\n' +
                    '    risk: medium\n' +
                    '    verifyMethod: demonstration\n' +
                    '    }\n' +
                    '\n' +
                    '    interfaceRequirement test_req4 {\n' +
                    '    id: 1.2.1\n' +
                    '    text: the fourth test text.\n' +
                    '    risk: medium\n' +
                    '    verifyMethod: analysis\n' +
                    '    }\n' +
                    '\n' +
                    '    physicalRequirement test_req5 {\n' +
                    '    id: 1.2.2\n' +
                    '    text: the fifth test text.\n' +
                    '    risk: medium\n' +
                    '    verifyMethod: analysis\n' +
                    '    }\n' +
                    '\n' +
                    '    designConstraint test_req6 {\n' +
                    '    id: 1.2.3\n' +
                    '    text: the sixth test text.\n' +
                    '    risk: medium\n' +
                    '    verifyMethod: analysis\n' +
                    '    }\n' +
                    '\n' +
                    '    element test_entity {\n' +
                    '    type: simulation\n' +
                    '    }\n' +
                    '\n' +
                    '    element test_entity2 {\n' +
                    '    type: word doc\n' +
                    '    docRef: reqs/test_entity\n' +
                    '    }\n' +
                    '\n' +
                    '    element test_entity3 {\n' +
                    '    type: "test suite"\n' +
                    '    docRef: github.com/all_the_tests\n' +
                    '    }\n' +
                    '\n' +
                    '\n' +
                    '    test_entity - satisfies -> test_req2\n' +
                    '    test_req - traces -> test_req2\n' +
                    '    test_req - contains -> test_req3\n' +
                    '    test_req3 - contains -> test_req4\n' +
                    '    test_req4 - derives -> test_req5\n' +
                    '    test_req5 - refines -> test_req6\n' +
                    '    test_entity3 - verifies -> test_req5\n' +
                    '    test_req <- copies - test_entity2\n'
            },

        ]
    },
    {
        title: 'Sankey Diagram',
        content: [
            {
                img: photosynthesis_dia,
                dec: 'Photosynthesis - Sankey template',
                code: 'sankey-beta\n' +
                    'Net Primary production %,Consumed energy %,85\n' +
                    'Net Primary production %,Detritus %,15\n' +
                    'Consumed energy %,Egested energy %,20%\n' +
                    'Consumed energy %,Assimilated Energy %,65\n' +
                    'Assimilated Energy %, Energy for Growth %, 25\n' +
                    'Assimilated Energy %, Respired energy %, 40\n' +
                    'Detritus %, Consumed by microbes %, 10\n' +
                    'Detritus %, Stored in the earth %, 5\n'
            },
            {
                img: basic_snakey_dia,
                dec: 'A basic sankey diagram',
                code: 'sankey-beta\n' +
                    'Bio-conversion,Losses,26.862\n' +
                    'Bio-conversion,Solid,280.322\n' +
                    'Bio-conversion,Gas,81.144\n'
            },
            {
                img: complex_snakey_dia,
                dec: 'A complex sankey diagram',
                code: '---\n' +
                    'config:\n' +
                    '  sankey:\n' +
                    '    showValues: false\n' +
                    '---\n' +
                    'sankey-beta\n' +
                    '\n' +
                    'Agricultural \'waste\',Bio-conversion,124.729\n' +
                    'Bio-conversion,Liquid,0.597\n' +
                    'Bio-conversion,Losses,26.862\n' +
                    'Bio-conversion,Solid,280.322\n' +
                    'Bio-conversion,Gas,81.144\n' +
                    'Biofuel imports,Liquid,35\n' +
                    'Biomass imports,Solid,35\n' +
                    'Coal imports,Coal,11.606\n' +
                    'Coal reserves,Coal,63.965\n' +
                    'Coal,Solid,75.571\n' +
                    'District heating,Industry,10.639\n' +
                    'District heating,Heating and cooling - commercial,22.505\n' +
                    'District heating,Heating and cooling - homes,46.184\n' +
                    'Electricity grid,Over generation / exports,104.453\n' +
                    'Electricity grid,Heating and cooling - homes,113.726\n' +
                    'Electricity grid,H2 conversion,27.14\n' +
                    'Electricity grid,Industry,342.165\n' +
                    'Electricity grid,Road transport,37.797\n' +
                    'Electricity grid,Agriculture,4.412\n' +
                    'Electricity grid,Heating and cooling - commercial,40.858\n' +
                    'Electricity grid,Losses,56.691\n' +
                    'Electricity grid,Rail transport,7.863\n' +
                    'Electricity grid,Lighting & appliances - commercial,90.008\n' +
                    'Electricity grid,Lighting & appliances - homes,93.494\n' +
                    'Gas imports,Ngas,40.719\n' +
                    'Gas reserves,Ngas,82.233\n' +
                    'Gas,Heating and cooling - commercial,0.129\n' +
                    'Gas,Losses,1.401\n' +
                    'Gas,Thermal generation,151.891\n' +
                    'Gas,Agriculture,2.096\n' +
                    'Gas,Industry,48.58\n' +
                    'Geothermal,Electricity grid,7.013\n' +
                    'H2 conversion,H2,20.897\n' +
                    'H2 conversion,Losses,6.242\n' +
                    'H2,Road transport,20.897\n' +
                    'Hydro,Electricity grid,6.995\n' +
                    'Liquid,Industry,121.066\n' +
                    'Liquid,International shipping,128.69\n' +
                    'Liquid,Road transport,135.835\n' +
                    'Liquid,Domestic aviation,14.458\n' +
                    'Liquid,International aviation,206.267\n' +
                    'Liquid,Agriculture,3.64\n' +
                    'Liquid,National navigation,33.218\n' +
                    'Liquid,Rail transport,4.413\n' +
                    'Marine algae,Bio-conversion,4.375\n' +
                    'Ngas,Gas,122.952\n' +
                    'Nuclear,Thermal generation,839.978\n' +
                    'Oil imports,Oil,504.287\n' +
                    'Oil reserves,Oil,107.703\n' +
                    'Oil,Liquid,611.99\n' +
                    'Other waste,Solid,56.587\n' +
                    'Other waste,Bio-conversion,77.81\n' +
                    'Pumped heat,Heating and cooling - homes,193.026\n' +
                    'Pumped heat,Heating and cooling - commercial,70.672\n' +
                    'Solar PV,Electricity grid,59.901\n' +
                    'Solar Thermal,Heating and cooling - homes,19.263\n' +
                    'Solar,Solar Thermal,19.263\n' +
                    'Solar,Solar PV,59.901\n' +
                    'Solid,Agriculture,0.882\n' +
                    'Solid,Thermal generation,400.12\n' +
                    'Solid,Industry,46.477\n' +
                    'Thermal generation,Electricity grid,525.531\n' +
                    'Thermal generation,Losses,787.129\n' +
                    'Thermal generation,District heating,79.329\n' +
                    'Tidal,Electricity grid,9.452\n' +
                    'UK land based bioenergy,Bio-conversion,182.01\n' +
                    'Wave,Electricity grid,19.013\n' +
                    'Wind,Electricity grid,289.366\n'
            },

        ]
    },
    {
        title: 'Sequence Diagram',
        content: [
            {
                img: basic_seq_dia,
                dec: 'A basic sequence diagram with participants and activations',
                code: 'sequenceDiagram\n' +
                    '    Alice->>+John: Hello John, how are you?\n' +
                    '    Alice->>+John: John, can you hear me?\n' +
                    '    John-->>-Alice: Hi Alice, I can hear you!\n' +
                    '    John-->>-Alice: I feel great!\n'
            },
            {
                img: log_in_process,
                dec: 'Log in process - Sequence Template',
                code: 'sequenceDiagram\n' +
                    '  Actor Customer as User\n' +
                    '  participant LoginPage as Log in page\n' +
                    '  participant P1 as Log in details storage\n' +
                    '  participant P2 as Security Department\n' +
                    '\n' +
                    '  Customer ->>+ LoginPage: Input: Username\n' +
                    '  Customer ->>+ LoginPage: Input: Password\n' +
                    '  LoginPage ->> P1: Username and password\n' +
                    '  P1 ->> P1: Authenticate\n' +
                    '  alt Successful Authentication\n' +
                    '    LoginPage ->> LoginPage: Redirect to welcome page\n' +
                    '    LoginPage ->> Customer: Log in successful, stand by\n' +
                    '  else Failed Authentication\n' +
                    '  P1 ->> LoginPage: If rejected\n' +
                    '  Customer ->> Customer: I forgot my password...\n' +
                    '  LoginPage ->> Customer: Password Hint\n' +
                    '  Customer ->> Customer: I still can\'t remember...\n' +
                    'end\n' +
                    '\n' +
                    'LoginPage ->> Customer: Do you wish to reset your password\n' +
                    'opt Password Reset Flow\n' +
                    '  Customer ->> LoginPage: Yes\n' +
                    '  LoginPage ->> P2: New password request\n' +
                    '  P2 ->> P2: Validate email address\n' +
                    '  P2 ->> Customer: Email sent with a reset link\n' +
                    '  Customer ->> P2: Input new password\n' +
                    '  P2 ->> P2: Process new password\n' +
                    '  P2 ->> P1: Store new password\n' +
                    '  P2 ->> P2: Redirect user to log in page\n' +
                    'end\n'
            },
            {
                img: sequence_dia_with_act_sym,
                dec: 'A sequence diagram with actor symbols instead of boxes',
                code: 'sequenceDiagram\n' +
                    '    actor Alice\n' +
                    '    actor Bob\n' +
                    '    Alice->>Bob: Hi Bob\n' +
                    '    Bob->>Alice: Hi Alice\n'
            },
            {
                img: sequence_dia_with_grouped_act,
                dec: 'A sequence diagram with grouped actors',
                code: ' sequenceDiagram\n' +
                    '    box Purple Alice & John\n' +
                    '    participant A\n' +
                    '    participant J\n' +
                    '    end\n' +
                    '    box Another Group\n' +
                    '    participant B\n' +
                    '    participant C\n' +
                    '    end\n' +
                    '    A->>J: Hello John, how are you?\n' +
                    '    J->>A: Great!\n' +
                    '    A->>B: Hello Bob, how is Charly ?\n' +
                    '    B->>C: Hello Charly, how are you?\n'
            },
            {
                img: sequence_dia_with_diff_msg,
                dec: 'A sequence diagram with different message types',
                code: 'sequenceDiagram\n' +
                    '    actor Alice\n' +
                    '    actor Bob\n' +
                    '\n' +
                    '    Alice->Bob:Solid line without arrow\n' +
                    'Alice-->Bob:Dotted line without arrow\n' +
                    'Alice->>Bob:Solid line with arrowhead\n' +
                    'Alice-->>Bob:Dotted line with arrowhead\n' +
                    'Alice-xBob:Solid line with a cross at the end\n' +
                    'Alice--xBob:Dotted line with a cross at the end.\n' +
                    'Alice-)Bob:Solid line with an open arrow at the end (async)\n' +
                    'Alice--)Bob:Dotted line with a open arrow at the end (async)\n'
            },
            {
                img: sequence_dia_with_note,
                dec: 'A sequence diagram with a note',
                code: 'sequenceDiagram\n' +
                    '    Alice->John: Hello John, how are you?\n' +
                    '    Note over Alice,John: A typical interaction<br/>But now in two lines Alice ohn\n'
            },
            {
                img: sequence_with_auto_num_dia,
                dec: 'A sequence diagram with auto-numbering',
                code: 'sequenceDiagram\n' +
                    '    autonumber\n' +
                    '    Alice->>John: Hello John, how are you?\n' +
                    '    loop Healthcheck\n' +
                    '        John->>John: Fight against hypochondria\n' +
                    '    end\n' +
                    '    Note right of John: Rational thoughts!\n' +
                    '    John-->>Alice: Great!\n' +
                    '    John->>Bob: How about you?\n' +
                    '    Bob-->>John: Jolly good!\n' +
                    '\n'
            },
            {
                img: sequence_with_loop_dia,
                dec: 'A sequence diagram with a loop, alt, and opt statements',
                code: 'sequenceDiagram\n' +
                    '    Alice->John: Hello John, how are you?\n' +
                    '    loop Every minute\n' +
                    '    John-->Alice: Great!\n' +
                    '    end\n' +
                    '    alt is sick\n' +
                    '        Bob->>Alice: Not so good :(\n' +
                    '    else is well\n' +
                    '        Bob->>Alice: Feeling fresh like a daisy\n' +
                    '    end\n' +
                    '    opt Extra response\n' +
                    '        Bob->>Alice: Thanks for asking\n' +
                    '    end\n'
            },
            {
                img: sequence_dia,
                dec: 'A sequence diagram with regions highlighted using the background color',
                code: 'sequenceDiagram\n' +
                    '    participant Alice\n' +
                    '    participant John\n' +
                    '\n' +
                    '    rect rgb(191, 223, 255)\n' +
                    '    note right of Alice: Alice calls John.\n' +
                    '    Alice->>+John: Hello John, how are you?\n' +
                    '    rect rgb(200, 150, 255)\n' +
                    '    Alice->>+John: John, can you hear me?\n' +
                    '    John-->>-Alice: Hi Alice, I can hear you!\n' +
                    '    end\n' +
                    '    John-->>-Alice: I feel great!\n' +
                    '    end\n' +
                    '    Alice ->>+ John: Did you want to go to the game tonight?\n' +
                    '    John -->>- Alice: Yeah! See you there.\n' +
                    '\n'
            },

        ]
    },
    {
        title: 'State Diagram',
        content: [
            {
                img: basic_state_dia,
                dec: 'A basic state diagram\n' +
                    '\n',
                code: 'stateDiagram\n' +
                    '    [*] --> Still\n' +
                    '    Still --> [*]\n' +
                    '    Still --> Moving\n' +
                    '    Moving --> Still\n' +
                    '    Moving --> Crash\n' +
                    '    Crash --> [*]\n'
            },

        ]
    },
    {
        title: 'Timeline',
        content: [
            {
                img: project_timeline_dia,
                dec: 'An example timeline depicting the Industrial Revolution',
                code: 'timeline\n' +
                    '    title Timeline of Industrial Revolution\n' +
                    '    section 17th-20th century\n' +
                    '        Industry 1.0 : Machinery, Water power, Steam <br>power\n' +
                    '        Industry 2.0 : Electricity, Internal combustion engine, Mass production\n' +
                    '        Industry 3.0 : Electronics, Computers, Automation\n' +
                    '    section 21st century\n' +
                    '        Industry 4.0 : Internet, Robotics, Internet of Things\n' +
                    '        Industry 5.0 : Artificial intelligence, Big data,3D printing\n'
            },
            {
                img: ex_timeline_dia,
                dec: 'A project timeline',
                code: 'timeline\n' +
                    '    title Project Timeline\n' +
                    '    section January - March\n' +
                    '        Research : Begin working on a prototype\n' +
                    '        Legal : Research patents and if other companies have similar ideas\n' +
                    '        Marketing : Probe the market and look for an opening\n' +
                    '    section April - June\n' +
                    '        Research : Test prototype and investigate ways of improving it\n' +
                    '        Legal : Begin working on filing for a patent\n' +
                    '        Marketing : Small scale marketing campaign, look for testers : Identify tester group and connect to Product Manager\n' +
                    '    section July\n' +
                    '        Vacation : Only maintenance work conducted\n' +
                    '    section August - September\n' +
                    '        Research : Move into beta-testing : Record learnings\n' +
                    '        Legal : Finish patent filing and wait for approval\n' +
                    '        Marketing : Launch a large scale marketing campaign to gauge purchasing interest\n' +
                    '        Production: Take beta tester feedback and implement improvements : Begin preparing for mass production of the product\n' +
                    '    section October - December\n' +
                    '        Research : Implement changes to the product based on results from beta-testing\n' +
                    '        Legal : Ensure the product is protected by patent before product launch\n' +
                    '        Marketing : Try to reach new client groups\n' +
                    '        Production: Scale up production to meet demand\n'
            },

        ]
    },
    {
        title: 'User Journey',
        content: [
            {
                img: user_journey_dia,
                dec: 'A user journey diagram showing a working day',
                code: 'journey\n' +
                    '    title My working day\n' +
                    '    section Go to work\n' +
                    '      Make tea: 5: Me\n' +
                    '      Go upstairs: 3: Me\n' +
                    '      Do work: 1: Me, Cat\n' +
                    '    section Go home\n' +
                    '      Go downstairs: 5: Me\n' +
                    '      Sit down: 5: Me\n' +
                    '    \n'
            },
        ]
    },
    {
        title: 'XY Chart',
        content: [
            {
                img: showing_training_progress,
                dec: 'Chart showing training progress over time',
                code: 'xychart-beta\n' +
                    '    title "Training progress"\n' +
                    '    x-axis [mon, tues, wed, thur, fri, sat, sun]\n' +
                    '    y-axis "Time trained (minutes)" 0 --> 300\n' +
                    '    bar [60, 0, 120, 180, 230, 300, 0]\n' +
                    '    line [60, 0, 120, 180, 230, 300, 0]\n'
            },
            {
                img: basic_y_dia,
                dec: 'A basic vertical xy chart',
                code: 'xychart-beta\n' +
                    '    title "Sales Revenue"\n' +
                    '    x-axis [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]\n' +
                    '    y-axis "Revenue (in $)" 4000 --> 11000\n' +
                    '    bar [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]\n' +
                    '    line [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]\n' +
                    '    \n'
            },
            {
                img: basic_x_dia,
                dec: 'A basic horizontal xy chart',
                code: 'xychart-beta horizontal\n' +
                    '    title "Sales Revenue"\n' +
                    '    x-axis [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]\n' +
                    '    y-axis "Revenue (in $)" 4000 --> 11000\n' +
                    '    bar [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]\n' +
                    '    line [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]\n' +
                    '    \n'
            },
        ]
    },
];