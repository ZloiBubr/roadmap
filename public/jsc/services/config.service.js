(function() {
	angular.module("App").factory("configService", function() {
		return {
			getConfig: getConfig
		}

		function getConfig(type) {
			switch(type.toLowerCase()) {
				case "epic":
					return getEpicConfig();
				case "story":
					return getStoryConfig(); 
			}
		}

		function getEpicConfig() {
			return {
			        legend: {
			            icons: [
			                {name: "DueDate Confirmed", icon:"img/icons/duedate2.png"},
			                {name: "Has Blockers", icon:"img/icons/ban.png"},
			                {name: "Has Deferred", icon:"img/icons/deffered.png"},
			                {name: "Priority", icons:["img/icons/1.png","img/icons/2.png", "img/icons/3.png", "img/icons/4.png", "img/icons/5.png"]},
			                {name: "Has XXL or XXXL pages", icon:"img/icons/xxl.png"}
			            ],
			            progressbars: [
			                {name: "Development %", type:"success"},
			                {name: "Checklists Creation %", type:"info"},
			                {name: "Functional Testing %", type:"warning"}
			            ]
			        },
			        groupBy: [{alias: "Team", field: "teamName", isChecked: true}, { alias: "Stream", field: "streamName", isChecked:true }],
			        filterGroups:[
			            {
			                name: "Filters",
			                operator: "and",
			                filters: [
			                    {
			                        id: "Version",
			                        name: "Version",
			                        color: "white",
			                        type: "dropdown",
			                        blankOption: "All",
			                        autofill: {
			                            field: "fixVersions"
			                        },
			                        values: [
			                            {
			                                name: "All", 
			                                criteria: undefined
			                            },
			                            {
			                                name: "Q1", 
			                                criteria: {
			                                    type: "operation",
			                                    operator: "or",
			                                    operands: [
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "2.0" },
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "3.0" },
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "4.0" }
			                                    ]
			                                }
			                            },
			                            {
			                                name: "Q2", 
			                                criteria: {
			                                    type: "operation",
			                                    operator: "or",
			                                    operands: [
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "5.0" },
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "6.0" },
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "7.0" }
			                                    ]
			                                }
			                            },
			                            {
			                                name: "Q12", 
			                                criteria: {
			                                    type: "operation",
			                                    operator: "or",
			                                    operands: [
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "2.0" },
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "3.0" },
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "4.0" },
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "5.0" },
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "6.0" },
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "7.0" }
			                                    ]
			                                }
			                            },
			                            {
			                                name: "Q3", 
			                                criteria: {
			                                    type: "operation",
			                                    operator: "or",
			                                    operands: [
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "8.0" },
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "9.0" },
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "10.0" }
			                                    ]
			                                }
			                            },
			                            {
			                                name: "CORE", 
			                                criteria: {
			                                    type: "operation",
			                                    operator: "or",
			                                    operands: [
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "1.0" },
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "2.0" },
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "3.0" },
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "4.0" },
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "5.0" },
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "6.0" },
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "7.0" }
			                                    ]
			                                }
			                            }
			                        ],
			                        criteria: undefined
			                    },
			                    {
			                        id: "Sme",
			                        name: "SME",
			                        color: "white",
			                        type: "dropdown",
			                        blankOption: "All",
			                        autofill: {
			                            field: "smename"
			                        },
			                        values: [
			                            { name: "All", criteria: undefined }
			                        ],
			                        criteria: undefined
			                    },
			                    {
			                        id: "Group",
			                        name: "Group",
			                        color: "white",
			                        type: "dropdown",
			                        blankOption: "All",
			                        autofill: {
			                            field: "moduleGroup"
			                        },
			                        values: [
			                            { name: "All", criteria: undefined }
			                        ],
			                        criteria: undefined
			                    },
			                    {
			                        id: "Team",
			                        name: "Team",
			                        color: "white",
			                        type: "dropdown",
			                        blankOption: "All",
			                        autofill: {
			                            field: "teamName"
			                        },
			                        values: [
			                            { name: "All", criteria: undefined }
			                        ],
			                        criteria: undefined
			                    }
			                ]
			            }
			        ],
			        statuses: [
			            {
			                id: "InProgress",
			                name: "In Progress", 
			                color: "red",
			                type: "checkbox",
			                isChecked: true,
			                criteria: {
			                  type: "operation",
			                  operator: "or",
			                  operands: [ 
			                        { type: "criteria", field: "status", value : "In Progress"},
			                        { type: "criteria", field: "status", value : "Open"},
			                        { type: "criteria", field: "status", value : "Blocked"},
			                        { type: "criteria", field: "status", value : "Reopened"},
			                        { type: "criteria", field: "status", value : "Deferred"},
			                        { type: "criteria", field: "status", value : "Assigned"},
			                        { type: "criteria", field: "status", value : "Code Review"},
			                        { type: "criteria", field: "status", value : "Declined"},
			                        { type: "criteria", field: "status", value : "Not Applicable"}
			                    ] 
			                } 
			            },
			            {
			                id: "TestingInProgress",
			                name: "Testing in progress", 
			                color: "green",
			                type: "checkbox",
			                isChecked: true,
			                criteria: {
			                  type: "operation",
			                  operator: "or",
			                  operands: [ 
			                        {type: "criteria", field: "status", value: "Testing in Progress"},
			                        {type: "criteria", field: "status", value: "Ready for QA"}
			                    ]
			                }
			            },
			            {
			                id: "Resolved",
			                name: "Resolved", 
			                color: "blue",
			                type: "checkbox",
			                isChecked: true,
			                criteria: {
			                  type: "operation",
			                  operator: "and",
			                  operands: [ 
			                        { type: "criteria", field: "status", value: "Resolved"}
			                    ]
			                }
			            },
			            {
			                id:"Accepted",
			                name: "Accepted", 
			                color: "lightblue",
			                type: "checkbox",
			                isChecked: true,
			                criteria: {
			                  type: "operation",
			                  operator: "and",
			                  operands: [ 
			                        { type: "criteria", field: "status", value: "Accepted"}
			                    ]
			                }
			            },
			            {
			                id: "OutOfScope",
			                name: "Out of Scope", 
			                color: "yellow",
			                type: "checkbox", 
			                isChecked: true,
			                criteria: {
			                  type: "operation",
			                  operator: "and",
			                  operands: [ 
			                        {type: "criteria", field: "moduleResolution", value: "Out of Scope"},
			                        {type: "criteria", field: "moduleStatus", value: "Closed"}
			                    ]
			                }
			            },
			            {
			                id: "NotApplicable",
			                name: "Not Applicable", 
			                color: "lime",
			                type: "checkbox", 
			                isChecked: true,
			                criteria: {
			                  type: "operation",
			                  operator: "and",
			                  operands: [ 
			                        { type: "criteria", field: "moduleStatus", value: "Closed"},
			                        { type: "criteria", field: "moduleResolution", value: "Done"},
			                        { type: "criteria", field: "pagescount", operator: "<", value: "1", valuetype: "int"}
			                    ]
			                }
			            },
			            {
			                id: "DevComplete",
			                name: "Dev Complete", 
			                color: "maroon",
			                type: "checkbox",
			                isChecked: true,
			                criteria: {
			                  type: "operation",
			                  operator: "and",
			                  operands: [ 
			                        { type: "criteria", field: "status", value: "Ready for PM Handoff"},
			                        { type: "criteria", field: "moduleStatus", value: "Closed"}
			                    ]
			                }
			            },
			            {
			                id: "PMReview",
			                name: "PM Review", 
			                color: "whitesmoke",
			                type: "checkbox",
			                isChecked: true,
			                criteria: {
			                  type: "operation",
			                  operator: "and",
			                  operands: [ 
			                        {type: "criteria", field: "moduleStatus", value: "Closed"},
			                        {type: "criteria", field: "status", value: "PM Review"}
			                    ]
			                }
			            },
			            {
			                id: "LAReady",
			                name: "LA Ready", 
			                color: "grey",
			                type: "checkbox", 
			                isChecked: true,
			                criteria: {
			                  type: "operation",
			                  operator: "and",
			                  operands: [ 
			                        {type: "criteria", field: "moduleStatus", value: "Closed"},
			                        {type: "criteria", field: "status", value: "LA Ready"}
			                    ]
			                }
			            }  
			        ],
			        totals: [
			        	{
			        		name: "SP",
			        		values: [
			        			{
			        				name: "Reported Story Points",
			        				expression: {
				        				type: "expression",
				        				operation: "sum",
				        				operands: [
				        					{field: "reportedSP"}
				        				]
				        			} 
			        			},
			        			{
			        				name: "Total Story Points",
			        				expression: {
				        				type: "expression",
				        				operation: "sum",
				        				operands: [
				        					{field: "summarySP"}
				        				]
				        			}
			        			}
			        		]
			        		
			        	}
			        ],
			        grid: {
			            showCards: true,
			            column: { 
			            	displayValue: {
			            		expression:
			            			{
			            				type: "expression",
			            				operation: "value",
			            				operands: [
			            					{ field: "fixVersions" }
			            				]
			            			}
			            	},
			            	value: {
			            		expression: {
			            			type: "expression",
			            			operation: "cast",
			            			operands: [
			            				{field: "fixVersions"},
			            				{type: "number"}
			            			]
			            		}
			            	}
			            },
			            groupBy: [{alias: "Team", field: "teamName"}, { alias: "Stream", field: "streamName" }],
			            summary: {
			            	labels: [
			            		{
			            			name: "Total Story Points",
			            			color: "lightblue",
			            			expression: 
			            			{
			            				operation: "sum",
			            				operands: [
			            					{ field: "summarySP" }
			            				]
			            			}
			            		},
			            		{
			            			name: "Rest Story Points",
			            			color: "lightgreen", 
			            			expression: 
			            			{ 
			            				operation: "substract", 
			            				operands: [
			            					{ field: "summarySP" },
			            					{ field: "reportedSP" }
			            				]
			            			}
			            		}
			            	],
			            	progressbars: [
			            		{
			            			name: "Development progress",
			            			type: "success",
			            			expression: {
			            				operation: "mult",
			            				operands: [
			            					{
			            						type: "expression",
			            						operation: "div",
			            						operands: [
			            							{
			            								type: "expression",
			            								operation: "sum",
			            								operands: [
			            									{field: "reportedSP"}
			            								]
			            							},
			            							{
			            								type: "expression",
			            								operation: "sum",
			            								operands: [
			            									{field: "summarySP"}
			            								]
			            							}
			            						]
			            					},
			            					{ value: 100 }
			            				]

			            			}
			            		},
			            		{
			            			name: "Checklists Progress",
			            			type: "info",
			            			expression: {
			            				operation: "div",
			            				operands: [
			            					{
	            								type: "expression",
			            						operation: "sum",
			            						operands: [
			            							{
			            								type: "expression",
			            								operation: "mult",
			            								operands: [
			            									{field: "checklistsProgress"},
			            									{field: "summarySP"}
			            								]
			            							}
			            						]
			            					},
			            					{
			            						type: "expression",
			            						operation: "sum",
			            						operands: [
			            							{field: "summarySP"}
			            						] 
			            					}
			            				]

			            			}
			            		},
			            		{
			            			name: "QA Progress",
			            			type: "warning",
			            			expression: {
			            				operation: "div",
			            				operands: [
			            					{
	            								type: "expression",
			            						operation: "sum",
			            						operands: [
			            							{
			            								type: "expression",
			            								operation: "mult",
			            								operands: [
			            									{field: "testingProgress"},
			            									{field: "summarySP"}
			            								]
			            							}
			            						]
			            					},
			            					{
			            						type: "expression",
			            						operation: "sum",
			            						operands: [
			            							{field: "summarySP"}
			            						] 
			            					}
			            				]

			            			}
			            		}
			            	],
			                icons: [
			                    {
			                    	name: "Deferred", 
			                    	icon:"img/icons/deffered.png", 
			                    	expression: { 
			                    		operation:"any",
			                    		operands: [
			                    			{
			                    				type: "expression",
			                    				operation: "equal",
			                    				operands: [
			                    					{field: "hasdeferred"},
			                    					{value:1}		
			                    				]
			                    			}
			                    		]
			                    		
			                     	}
			                     },
			                    {
			                    	name: "Blocked", 
			                    	icon:"img/icons/ban.png", 
			                    	expression: {
			                    		operation:"any",
			                    		operands:[
			                    			{
			                    				type: "expression",
			                    				operation: "equal",
			                    				operands: [
			                    					{field: "hasblockers"},
			                    					{value:1}
			                    				]
			                    			}
			                    		]
			                    	}
			                    }
			                ]
			            },
			            card: {
			                key: {field: "key"},
			                name: {field:"name"},
			                url: {field: "uri"},
			                color:[
			                    {
			                        color: "red",
			                        criteria: {
			                          type: "operation",
			                          operator: "or",
			                          operands: [ 
			                                { type: "criteria", field: "status", value : "In Progress"},
			                                { type: "criteria", field: "status", value : "Open"},
			                                { type: "criteria", field: "status", value : "Blocked"},
			                                { type: "criteria", field: "status", value : "Reopened"},
			                                { type: "criteria", field: "status", value : "Deferred"},
			                                { type: "criteria", field: "status", value : "Assigned"},
			                                { type: "criteria", field: "status", value : "Code Review"},
			                                { type: "criteria", field: "status", value : "Declined"},
			                                { type: "criteria", field: "status", value : "Not Applicable"}
			                            ] 
			                        } 
			                    },
			                    {
			                        color: "green",
			                        criteria: {
			                          type: "operation",
			                          operator: "or",
			                          operands: [ 
			                                {type: "criteria", field: "status", value: "Testing in Progress"},
			                                {type: "criteria", field: "status", value: "Ready for QA"}
			                            ]
			                        } 
			                    },
			                    {
			                        color: "blue",
			                        criteria: {
			                          type: "operation",
			                          operator: "and",
			                          operands: [ 
			                                { type: "criteria", field: "status", value: "Resolved"}
			                            ]
			                        }
			                    },
			                    {
			                        color: "lightblue",
			                        criteria: {
			                          type: "operation",
			                          operator: "and",
			                          operands: [ 
			                                { type: "criteria", field: "status", value: "Accepted"}
			                            ]
			                        }
			                    },
			                    {
			                        color: "yellow",
			                        criteria: {
			                          type: "operation",
			                          operator: "and",
			                          operands: [ 
			                                {type: "criteria", field: "moduleResolution", value: "Out of Scope"},
			                                {type: "criteria", field: "moduleStatus", value: "Closed"}
			                            ]
			                        }
			                    },
			                    {
			                        color: "lime",
			                        criteria: {
			                          type: "operation",
			                          operator: "and",
			                          operands: [ 
			                                { type: "criteria", field: "moduleStatus", value: "Closed"},
			                                { type: "criteria", field: "moduleResolution", value: "Done"},
			                                { type: "criteria", field: "pagescount", operator: "<", value: "1", valuetype: "int"}
			                            ]
			                        }
			                    },
			                    {
			                        color: "maroon",
			                        criteria: {
			                          type: "operation",
			                          operator: "and",
			                          operands: [ 
			                                { type: "criteria", field: "status", value: "Ready for PM Handoff"},
			                                { type: "criteria", field: "moduleStatus", value: "Closed"}
			                            ]
			                        }
			                    },
			                    {
			                        color: "whitesmoke",
			                        criteria: {
			                          type: "operation",
			                          operator: "and",
			                          operands: [ 
			                                {type: "criteria", field: "moduleStatus", value: "Closed"},
			                                {type: "criteria", field: "status", value: "PM Review"}
			                            ]
			                        }
			                    },
			                    {
			                        color: "grey",
			                        criteria: {
			                          type: "operation",
			                          operator: "and",
			                          operands: [ 
			                                {type: "criteria", field: "moduleStatus", value: "Closed"},
			                                {type: "criteria", field: "status", value: "LA Ready"}
			                            ]
			                        }
			                    }
			                ],
			                progressbars: [
			                    {name: "Development progress", type:"success", field:"progress"},
			                    {name: "Checklists Progress", type:"info", field:"checklistsProgress"},
			                    {name: "QA Progress", type:"warning", field:"testingProgress"}
			                ],
			                iconsRight: [
			                    {
			                    	name: "Has XXL or XXXL pages", 
			                    	icon:"img/icons/xxl.png", 
			                    	expression: { 
			                    		operation: "equal",
			                    		operands: [
			                    			{ field: "xxl"},
			                    			{ value:true }
			                    		]
			                    	}
			                    },
			                    {
			                    	name: "Deferred", 
			                    	icon:"img/icons/deffered.png", 
			                    	expression: {
			                    		operation: "equal",
			                    		operands: [
			                    			{field: "hasdeferred"},
			                    			{value:1}
			                    		]
			                    	}
			                    },
			                    {
			                    	name: "Blocked", 
			                    	icon:"img/icons/ban.png", 
			                    	expression: {
			                    		operation: "equal",
			                    		operands: [
			                    			{field: "hasblockers"},
			                    			{value:1}	
			                    		]
			                    	}
			                    },
			                    {
			                    	name: "Due Date confirmed", 
			                    	icon:"img/icons/duedate2.png", 
			                    	expression: {
			                    		operation: "equal",
			                    		operands: [
			                    			{ field: "dueDateConfirmed" },
			                    			{value:true}
			                    		]
			                    	}
			                    },
			                    {
			                    	name: "Priority Blocker", 
			                    	icon:"img/icons/1.png", 
			                    	expression: {
			                    		operation: "equal",
			                    		operands: [
			                    			{field: "priority"},
			                    			{value:"Blocker"}
			                    		]
			                    	}
			                    },
			                    {
			                    	name: "Priority Critical", 
			                    	icon:"img/icons/2.png", 
			                    	expression: {
			                    		operation: "equal",
			                    		operands: [
			                    			{field: "priority"},
			                    			{value:"Critical"}
			                    		]
			                    	}
			                    },
			                    {
			                    	name: "Priority Major", 
			                    	icon:"img/icons/3.png", 
			                    	expression: {
			                    		operation: "equal",
			                    		operands: [
			                    			{field: "priority"},
			                    			{value:"Major"}
			                    		]
			                    	}
			                    },
			                    {
			                    	name: "Priority Minor", 
			                    	icon:"img/icons/4.png", 
			                    	expression: {
			                    		operation: "equal",
			                    		operands: [
			                    			{field: "priority"},
			                    			{value:"Minor"}
			                    		]
			                    	}
			                    },
			                    {
			                    	name: "Priority Trivial", 
			                    	icon:"img/icons/5.png", 
			                    	expression: {
			                    		operation: "equal",
			                    		operands: [
			                    			{field: "priority"},
			                    			{value:"Trivial"}
			                    		]
			                    	}
			                    }
			                ],
			                iconsLeft: [
			                    {
			                    	name: "Cloud Apps Count", 
			                    	color: "lightblue", 
			                    	expression: {
			                    		operation:"count",
			                    		operands: [
			                    			{ field: "cloudApps" }
			                    		]
			                    	}
			                    },
			                    {
			                    	name: "Story Points", 
			                    	color: "lightgreen", 
			                    	expression: 
			                    	{
			                    		operation: "value",
			                    		operands: [
			                    			{ field: "summarySP"}
			                    		]
			                    		
			                    	}
			                    }
			                ],
			                mainValue: {
			                    name: "Rest Storypoints", 
			                    expression: { 
			                        operation: "substract", 
			                        operands: [
			                            {field: "summarySP"},
			                            {field: "reportedSP"}
			                        ]
			                    }
			                },
			                orderBy: ["priority", "name"]
			            }
			        }
			    };
		}

		function getStoryConfig() {
			return {
			        legend: {
			            icons: [
			                {name: "DueDate Confirmed", icon:"img/icons/duedate2.png"},
			                {name: "Priority", icons:["img/icons/1.png","img/icons/2.png", "img/icons/3.png", "img/icons/4.png", "img/icons/5.png"]},
							{name: "Has XXL or XXXL pages", icon:"img/icons/xxl.png"},
							{name: "Blocked by VP Screen", icon:"img/icons/triangle.svg"}
			            ],
			            progressbars: [
			                {name: "Development %", type:"success"},
			                {name: "Checklists Creation %", type:"info"},
			                {name: "Functional Testing %", type:"warning"}
			            ]
			        },
			        groupBy: [],
			        filterGroups:[
			            {
			                name: "Filters",
			                operator: "and",
			                filters: [
			                    {
			                        id: "Version",
			                        name: "Version",
			                        color: "white",
			                        type: "dropdown",
			                        blankOption: "All",
			                        autofill: {
			                            field: "fixVersions"
			                        },
			                        values: [
			                            {
			                                name: "All", 
			                                criteria: undefined
			                            },
			                            {
			                                name: "Q1", 
			                                criteria: {
			                                    type: "operation",
			                                    operator: "or",
			                                    operands: [
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "2.0" },
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "3.0" },
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "4.0" }
			                                    ]
			                                }
			                            },
			                            {
			                                name: "Q2", 
			                                criteria: {
			                                    type: "operation",
			                                    operator: "or",
			                                    operands: [
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "5.0" },
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "6.0" },
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "7.0" }
			                                    ]
			                                }
			                            },
			                            {
			                                name: "Q12", 
			                                criteria: {
			                                    type: "operation",
			                                    operator: "or",
			                                    operands: [
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "2.0" },
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "3.0" },
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "4.0" },
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "5.0" },
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "6.0" },
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "7.0" }
			                                    ]
			                                }
			                            },
			                            {
			                                name: "Q3", 
			                                criteria: {
			                                    type: "operation",
			                                    operator: "or",
			                                    operands: [
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "8.0" },
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "9.0" },
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "10.0" }
			                                    ]
			                                }
			                            },
			                            {
			                                name: "CORE", 
			                                criteria: {
			                                    type: "operation",
			                                    operator: "or",
			                                    operands: [
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "1.0" },
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "2.0" },
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "3.0" },
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "4.0" },
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "5.0" },
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "6.0" },
			                                        { type: "criteria", field: "fixVersions", operator: "contains", value: "7.0" }
			                                    ]
			                                }
			                            }
			                        ],
			                        criteria: undefined
			                    },
			                    {
			                        id: "Sme",
			                        name: "SME",
			                        color: "white",
			                        type: "dropdown",
			                        blankOption: "All",
			                        autofill: {
			                            field: "smeName"
			                        },
			                        values: [
			                            { name: "All", criteria: undefined }
			                        ],
			                        criteria: undefined
			                    },
			                    {
			                        id: "Group",
			                        name: "Group",
			                        color: "white",
			                        type: "dropdown",
			                        blankOption: "All",
			                        autofill: {
			                            field: "moduleGroupName"
			                        },
			                        values: [
			                            { name: "All", criteria: undefined }
			                        ],
			                        criteria: undefined
			                    },
			                    {
			                        id: "Module",
			                        name: "Module",
			                        color: "white",
			                        type: "dropdown",
			                        blankOption: "All",
			                        autofill: {
			                            field: "moduleName"
			                        },
			                        values: [
			                            { name: "All", criteria: undefined }
			                        ],
			                        criteria: undefined
			                    },
			                    {
			                        id: "Team",
			                        name: "Team",
			                        color: "white",
			                        type: "dropdown",
			                        blankOption: "All",
			                        autofill: {
			                            field: "teamName"
			                        },
			                        values: [
			                            { name: "All", criteria: undefined }
			                        ],
			                        criteria: undefined
			                    },
			                    {
			                        id: "Stream",
			                        name: "Stream",
			                        color: "white",
			                        type: "dropdown",
			                        blankOption: "All",
			                        autofill: {
			                            field: "streamName"
			                        },
			                        values: [
			                            { name: "All", criteria: undefined }
			                        ],
			                        criteria: undefined
			                    },
			                    {
					                id: "BlockedByVpScreens",
					                name: "Blocked by VP Screens", 
					                color: "lightblue",
					                type: "checkbox",
					                isChecked: false,
					                criteria: {
					                  type: "operation",
					                  operator: "and",
					                  operands: [ 
					                        { type: "criteria", field: "acceptanceLabels", operator: "contains", value : "HandoffBlockedByVP"}
					                    ] 
					                } 
					            },
					            {
					                id: "SalesDemoPathOnly",
					                name: "Sales Demo Path Only", 
					                color: "lightblue",
					                type: "checkbox",
					                isChecked: false,
					                criteria: {
					                  type: "operation",
					                  operator: "and",
					                  operands: [ 
					                        { type: "criteria", field: "acceptanceLabels", operator: "contains", value : "InSalesDemoPath"}
					                    ] 
					                } 
					            },
					            {
					                id: "ExpediteToLA",
					                name: "Expedite to LA", 
					                color: "lightblue",
					                type: "checkbox",
					                isChecked: false,
					                criteria: {
					                  type: "operation",
					                  operator: "and",
					                  operands: [ 
					                        { type: "criteria", field: "acceptanceLabels", operator: "contains", value : "ExpediteLA"}
					                    ] 
					                } 
					            }
			                ]
			            }
			        ],
			        statuses: [
			            {
			                id: "Deferred",
			                name: "Deferred", 
			                color: "LightPink",
			                type: "checkbox",
			                isChecked: false,
			                criteria: {
			                  type: "operation",
			                  operator: "and",
			                  operands: [ 
			                        { type: "criteria", field: "status", value : "Deferred"}
			                    ] 
			                } 
			            },
			            {
			                id: "Open",
			                name: "Open", 
			                color: "green",
			                type: "checkbox",
			                isChecked: false,
			                criteria: {
			                  type: "operation",
			                  operator: "and",
			                  operands: [ 
			                        { type: "criteria", field: "status", value : "Open"}
			                    ] 
			                } 
			            },
			            {
			                id: "Reopened",
			                name: "Reopened", 
			                color: "blue",
			                type: "checkbox",
			                isChecked: false,
			                criteria: {
			                  type: "operation",
			                  operator: "and",
			                  operands: [ 
			                        { type: "criteria", field: "status", value : "Reopened"}
			                    ] 
			                } 
			            },
			            {
			                id: "Assigned",
			                name: "Assigned", 
			                color: "yellow",
			                type: "checkbox",
			                isChecked: false,
			                criteria: {
			                  type: "operation",
			                  operator: "and",
			                  operands: [ 
			                        { type: "criteria", field: "status", value : "Assigned"}
			                    ] 
			                } 
			            },
			            {
			                id: "InProgress",
			                name: "In Progress", 
			                color: "lime",
			                type: "checkbox",
			                isChecked: false,
			                criteria: {
			                  type: "operation",
			                  operator: "and",
			                  operands: [ 
			                        { type: "criteria", field: "status", value : "In Progress"}
			                    ] 
			                } 
			            },
			            {
			                id: "CodeReview",
			                name: "Code Review", 
			                color: "lightblue",
			                type: "checkbox",
			                isChecked: false,
			                criteria: {
			                  type: "operation",
			                  operator: "and",
			                  operands: [ 
			                        { type: "criteria", field: "status", value : "Code Review"}
			                    ] 
			                } 
			            },
			            {
			                id: "ReadyForQA",
			                name: "Ready for QA", 
			                color: "lightgreen",
			                type: "checkbox",
			                isChecked: false,
			                criteria: {
			                  type: "operation",
			                  operator: "and",
			                  operands: [ 
			                        { type: "criteria", field: "status", value : "Ready for QA"}
			                    ] 
			                } 
			            },
			            {
			                id: "TestingInProgress",
			                name: "Testing in Progress", 
			                color: "maroon",
			                type: "checkbox",
			                isChecked: true,
			                criteria: {
			                  type: "operation",
			                  operator: "and",
			                  operands: [ 
			                        { type: "criteria", field: "status", value : "Testing in Progress"}
			                    ] 
			                } 
			            },
			            {
			                id: "Blocked",
			                name: "Blocked", 
			                color: "crimson",
			                type: "checkbox",
			                isChecked: false,
			                criteria: {
			                  type: "operation",
			                  operator: "and",
			                  operands: [ 
			                        { type: "criteria", field: "status", value : "Blocked"}
			                    ] 
			                } 
			            },
			            {
			                id: "Resolved",
			                name: "Resolved", 
			                color: "chartreuse",
			                type: "checkbox",
			                isChecked: false,
			                criteria: {
			                  type: "operation",
			                  operator: "and",
			                  operands: [ 
			                        { type: "criteria", field: "status", value : "Resolved"}
			                    ] 
			                } 
			            },
			            {
			                id: "Accepted",
			                name: "Accepted", 
			                color: "darkgray",
			                type: "checkbox",
			                isChecked: false,
			                criteria: {
			                  type: "operation",
			                  operator: "and",
			                  operands: [ 
			                        { type: "criteria", field: "status", value : "Accepted"}
			                    ] 
			                } 
			            },
			            {
			                id: "PMHandoff",
			                name: "PM Handoff", 
			                color: "forestgreen",
			                type: "checkbox",
			                isChecked: false,
			                criteria: {
			                  type: "operation",
			                  operator: "and",
			                  operands: [ 
			                        { type: "criteria", field: "status", value : "Ready for PM Handoff"}
			                    ] 
			                } 
			            },
			            {
			                id: "PMReview",
			                name: "PM Review", 
			                color: "greenyellow",
			                type: "checkbox",
			                isChecked: false,
			                criteria: {
			                  type: "operation",
			                  operator: "and",
			                  operands: [ 
			                        { type: "criteria", field: "status", value : "PM Review"}
			                    ] 
			                } 
			            },
			            {
			                id: "LAReady",
			                name: "LA Ready", 
			                color: "lawngreen",
			                type: "checkbox",
			                isChecked: false,
			                criteria: {
			                  type: "operation",
			                  operator: "and",
			                  operands: [ 
			                        { type: "criteria", field: "status", value : "LA Ready"}
			                    ] 
			                } 
			            }
			        ],
			        totals: [
			        	{
			        		name: "Pages",
			        		values: [
			        			{
			        				name: "Pages",
			        				expression: {
				        				type: "expression",
				        				operation: "sum",
				        				operands: [
				        					{field: "pages"}
				        				]
				        			} 
			        			}
			        		]
			        	}
			        ],
			        grid: {
			            showCards: true,
			            column: { 
			            	displayValue: {
			            		expression: {
			            				type: "expression",
			            				operation: "value",
			            				operands: [
			            					{ field: "status" }
			            				]
			            			}
			            	},
			            	value: {
			            		expression: {
			            				type: "expression",
			            				operation: "value",
			            				operands: [
			            					{ field: "status" }
			            				]
			            			}
			            	},
			            	order: ["Deferred", "Open", "Assigned", "Blocked", "In Progress", "Code Review", "Reopened", "Ready for QA", "Testing in Progress", "Resolved", "Accepted", "Ready for PM Handoff", "PM Review", "LA Ready"]
			            },
			            groupBy: [],
			            summary: {
			            	labels: [
			            		{
			            			name: "Total Story Points",
			            			color: "lightblue",
			            			expression: 
			            			{
			            				operation: "sum",
			            				operands: [
			            					{ field: "summarySP" }
			            				]
			            			}
			            		},
			            		{
			            			name: "Rest Story Points",
			            			color: "lightgreen", 
			            			expression: 
			            			{ 
			            				operation: "substract", 
			            				operands: [
			            					{ field: "summarySP" },
			            					{ field: "reportedSP" }
			            				]
			            			}
			            		}
			            	],
			            	progressbars: [],
			                icons: []
			            },
			            card: {
			                key: {field: "uri"},
			                name: {field:"name"},
			                url: {field: "uri"},
			                color:[
			                    {
					                color: "LightPink",
					                criteria: {
					                  type: "operation",
					                  operator: "and",
					                  operands: [ 
					                        { type: "criteria", field: "status", value : "Deferred"}
					                    ] 
					                } 
					            },
					            {
					                color: "green",
					                criteria: {
					                  type: "operation",
					                  operator: "and",
					                  operands: [ 
					                        { type: "criteria", field: "status", value : "Open"}
					                    ] 
					                } 
					            },
					            {
					                color: "blue",
					                criteria: {
					                  type: "operation",
					                  operator: "and",
					                  operands: [ 
					                        { type: "criteria", field: "status", value : "Reopened"}
					                    ] 
					                } 
					            },
					            {
					                color: "yellow",
					                criteria: {
					                  type: "operation",
					                  operator: "and",
					                  operands: [ 
					                        { type: "criteria", field: "status", value : "Assigned"}
					                    ] 
					                } 
					            },
					            {
					                color: "lime",
					                criteria: {
					                  type: "operation",
					                  operator: "and",
					                  operands: [ 
					                        { type: "criteria", field: "status", value : "In Progress"}
					                    ] 
					                } 
					            },
					            {
					                color: "lightblue",
					                criteria: {
					                  type: "operation",
					                  operator: "and",
					                  operands: [ 
					                        { type: "criteria", field: "status", value : "Code Review"}
					                    ] 
					                } 
					            },
					            {
					                color: "lightgreen",
					                criteria: {
					                  type: "operation",
					                  operator: "and",
					                  operands: [ 
					                        { type: "criteria", field: "status", value : "Ready for QA"}
					                    ] 
					                } 
					            },
					            {
					                color: "maroon",
					                criteria: {
					                  type: "operation",
					                  operator: "and",
					                  operands: [ 
					                        { type: "criteria", field: "status", value : "Testing in Progress"}
					                    ] 
					                } 
					            },
					            {
					                color: "crimson",
					                criteria: {
					                  type: "operation",
					                  operator: "and",
					                  operands: [ 
					                        { type: "criteria", field: "status", value : "Blocked"}
					                    ] 
					                } 
					            },
					            {
					                color: "chartreuse",
					                criteria: {
					                  type: "operation",
					                  operator: "and",
					                  operands: [ 
					                        { type: "criteria", field: "status", value : "Resolved"}
					                    ] 
					                } 
					            },
					            {
					                color: "darkgray",
					                criteria: {
					                  type: "operation",
					                  operator: "and",
					                  operands: [ 
					                        { type: "criteria", field: "status", value : "Accepted"}
					                    ] 
					                } 
					            },
					            {
					                color: "forestgreen",
					                criteria: {
					                  type: "operation",
					                  operator: "and",
					                  operands: [ 
					                        { type: "criteria", field: "status", value : "Ready for PM Handoff"}
					                    ] 
					                } 
					            },
					            {
					                color: "greenyellow",
					                criteria: {
					                  type: "operation",
					                  operator: "and",
					                  operands: [ 
					                        { type: "criteria", field: "status", value : "PM Review"}
					                    ] 
					                } 
					            },
					            {
					                color: "lawngreen",
					                criteria: {
					                  type: "operation",
					                  operator: "and",
					                  operands: [ 
					                        { type: "criteria", field: "status", value : "LA Ready"}
					                    ] 
					                } 
					            }
			                ],
			                progressbars: [
			                    {name: "Development progress", type:"success", field:"progress"},
			                    {name: "Checklists Progress", type:"info", field:"checklistsProgress"},
			                    {name: "QA Progress", type:"warning", field:"testingProgress"}
			                ],
			                iconsRight: [
			                	{
			                    	name: "Blcoked by VP screen", 
			                    	icon:"img/icons/triangle.svg", 
			                    	expression: { 
			                    		operation: "equal",
			                    		operands: [
			                    			{ field: "blockedVP"},
			                    			{ value:true }
			                    		]
			                    	}
			                    },
			                    {
			                    	name: "Has XXL or XXXL pages", 
			                    	icon:"img/icons/xxl.png", 
			                    	expression: { 
			                    		operation: "equal",
			                    		operands: [
			                    			{ field: "xxl"},
			                    			{ value:true }
			                    		]
			                    	}
			                    },
			                    {
			                    	name: "Deferred", 
			                    	icon:"img/icons/deffered.png", 
			                    	expression: {
			                    		operation: "equal",
			                    		operands: [
			                    			{field: "status"},
			                    			{value:"Deferred"}
			                    		]
			                    	}
			                    },
			                    {
			                    	name: "Blocked", 
			                    	icon:"img/icons/ban.png", 
			                    	expression: {
			                    		operation: "equal",
			                    		operands: [
			                    			{field: "status"},
			                    			{value: "Blocked"}	
			                    		]
			                    	}
			                    },
			                    {
			                    	name: "Due Date confirmed", 
			                    	icon:"img/icons/duedate2.png", 
			                    	expression: {
			                    		operation: "equal",
			                    		operands: [
			                    			{ field: "dueDateConfirmed" },
			                    			{value:true}
			                    		]
			                    	}
			                    },
			                    {
			                    	name: "Priority Blocker", 
			                    	icon:"img/icons/1.png", 
			                    	expression: {
			                    		operation: "equal",
			                    		operands: [
			                    			{field: "priority"},
			                    			{value:"Blocker"}
			                    		]
			                    	}
			                    },
			                    {
			                    	name: "Priority Critical", 
			                    	icon:"img/icons/2.png", 
			                    	expression: {
			                    		operation: "equal",
			                    		operands: [
			                    			{field: "priority"},
			                    			{value:"Critical"}
			                    		]
			                    	}
			                    },
			                    {
			                    	name: "Priority Major", 
			                    	icon:"img/icons/3.png", 
			                    	expression: {
			                    		operation: "equal",
			                    		operands: [
			                    			{field: "priority"},
			                    			{value:"Major"}
			                    		]
			                    	}
			                    },
			                    {
			                    	name: "Priority Minor", 
			                    	icon:"img/icons/4.png", 
			                    	expression: {
			                    		operation: "equal",
			                    		operands: [
			                    			{field: "priority"},
			                    			{value:"Minor"}
			                    		]
			                    	}
			                    },
			                    {
			                    	name: "Priority Trivial", 
			                    	icon:"img/icons/5.png", 
			                    	expression: {
			                    		operation: "equal",
			                    		operands: [
			                    			{field: "priority"},
			                    			{value:"Trivial"}
			                    		]
			                    	}
			                    }
			                ],
			                iconsLeft: [
			                    {
			                    	name: "Story Points", 
			                    	color: "lightblue", 
			                    	expression: 
			                    	{
			                    		operation: "value",
			                    		operands: [
			                    			{ field: "summarySP"}
			                    		]
			                    		
			                    	}
			                    },
			                    {
			                    	name: "Pages", 
			                    	color: "lightgreen", 
			                    	expression: {
			                    		operation:"value",
			                    		operands: [
			                    			{ field: "pages" }
			                    		]
			                    	}
			                    }
			                ],
			                mainValue: {
			                    name: "Rest Storypoints", 
			                    expression: { 
			                        operation: "substract", 
			                        operands: [
			                            {field: "summarySP"},
			                            {field: "reportedSP"}
			                        ]
			                    }
			                },
			                showDetails: true,
			                details: [
			                	{
			                		icon: "img/person2.png",
			                		name: "SME",
			                		expression: {
			            				type: "expression",
			            				operation: "value",
			            				operands: [
			            					{ field: "smeName" }
			            				]
			            			}
			                	},
			                	{
			                		icon: "img/person.png",
			                		name: "Assignee",
			                		expression: {
			            				type: "expression",
			            				operation: "value",
			            				operands: [
			            					{ field: "assignees" }
			            				]
			            			}
			                	},
			                	{
			                		icon: "img/person3.png",
			                		name: "Acceptance Assignee",
			                		expression: {
			            				type: "expression",
			            				operation: "value",
			            				operands: [
			            					{ field: "acceptanceAssignee" }
			            				]
			            			}
			                	},
			                	{
			                		icon: "img/clockblue.png",
			                		name: "Development spent hours",
			                		expression: {
			            				type: "expression",
			            				operation: "value",
			            				operands: [
			            					{ field: "devTimeSpent" }
			            				]
			            			}
			                	},
			                	{
			                		icon: "img/clockred.png",
			                		name: "QA spent hours",
			                		expression: {
			            				type: "expression",
			            				operation: "value",
			            				operands: [
			            					{ field: "qaTimeSpent" }
			            				]
			            			}
			                	},
			                	{
			                		icon: "img/clocksp.png",
			                		name: "Hours spent per Story Point",
			                		expression: {
			            				type: "expression",
			            				operation: "value",
			            				operands: [
			            					{ field: "hoursPerStoryPoint" }
			            				]
			            			}
			                	},
			                	{
			                		icon: "img/module.png",
			                		name: "Module Name",
			                		expression: {
			            				type: "expression",
			            				operation: "value",
			            				operands: [
			            					{ field: "moduleName" }
			            				]
			            			}
			                	},
			                	{
			                		icon: "img/date.png",
			                		name: "Ready for PM Handoff",
			                		expression: {
			            				type: "expression",
			            				operation: "value",
			            				operands: [
			            					{ field: "cusfinish" }
			            				]
			            			}
			                	},
			                	{
			                		icon: "img/date.png",
			                		name: "PM Review",
			                		expression: {
			            				type: "expression",
			            				operation: "value",
			            				operands: [
			            					{ field: "pmhfinish" }
			            				]
			            			}
			                	},
			                	{
			                		icon: "img/date.png",
			                		name: "LA Ready",
			                		expression: {
			            				type: "expression",
			            				operation: "value",
			            				operands: [
			            					{ field: "lafinish" }
			            				]
			            			}
			                	}

			                ],
			                orderBy: ["priority", "name"]
			            }
			        }
			    };
		}
	})
})();