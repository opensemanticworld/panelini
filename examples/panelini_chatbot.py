"""A lightweight example of a Chatbot Panelini application."""

import os

import panel as pn
from dotenv import load_dotenv
from langchain.agents import AgentExecutor, create_tool_calling_agent
from langchain_core.messages import AIMessage, HumanMessage
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import AzureChatOpenAI

from panelini import Panelini

# Load environment variables from a .env file
load_dotenv()


# Environment variables must be available in .evn file or system environment
LLM = AzureChatOpenAI(
    azure_endpoint=os.environ.get("AZURE_OPENAI_ENDPOINT"),
    api_version=os.environ.get("AZURE_OPENAI_API_VERSION"),
    model="gpt-4o-2024-08-06",
)


class HistoryToolAgent:
    def __init__(self, llm=LLM, tools=None, prompt_template=None):
        """
        a class including necessary functions to orchestrate a llm tool agent with history
        """
        self.llm = llm
        self.tools = tools
        self.prompt_template = prompt_template
        if self.prompt_template is None:
            self.prompt_template = ChatPromptTemplate.from_messages([
                (
                    "system",
                    """
                        You are a helpful assistant.
                        If the user asks for a good material for some use-case use your tools to
                            (1) ask if you may define application-specific requirements.
                            (2) define the requirements and
                            (3) return a sorted list of materials that fit the requirements.
                        If you are not sure about the requirements, ask the user for more information.
                    """,
                ),
                ("placeholder", "{chat_history}"),
                ("human", "{input}"),
                ("placeholder", "{agent_scratchpad}"),
            ])

        # Construct the Tools agent
        self.langchain_agent = create_tool_calling_agent(self.llm, tools, self.prompt_template)
        # Create an agent executor by passing in the agent and tools
        self.agent_executor = AgentExecutor(
            agent=self.langchain_agent,
            tools=tools,
            verbose=True,
            return_intermediate_steps=True,
        )
        self.chat_history = []

    async def invoke(self, prompt):
        """Invoke the agent with the given prompt and chat history."""
        res = await self.agent_executor.ainvoke({"input": prompt, "chat_history": self.chat_history})

        self.chat_history.extend([
            HumanMessage(content=prompt),
            str(res["intermediate_steps"]),  # TODO: find proper Type for intermediate steps
            AIMessage(content=res["output"]),
        ])
        return res


async def get_response(contents, user, instance):
    """
    Callback function to get a response from the agent based on user input.
    This function is called when the user sends a message in the chat interface.
    """
    response = await agent.invoke(contents)
    response_message = pn.chat.ChatMessage(
        object=response["output"],
        user="🤖 Assistant",
        show_edit_icon=False,
        show_timestamp=False,
        show_reaction_icons=False,
        #
    )
    return response_message


chat_history = []
tools = []
agent = HistoryToolAgent(tools=tools)

chat_interface = pn.chat.ChatInterface(
    callback=get_response,
    user="🧑 User",
    min_width=330,
    show_send=True,
    show_rerun=False,
    show_undo=False,
    show_timestamp=False,
    show_button_name=False,
    show_reaction_icons=False,
    callback_exception="verbose",
    css_classes=["chat-interface"],
)

# Create an instance of Panelini
app = Panelini(
    title="📊 Welcome to Panelini! 🖥️",
    sidebar_enabled=False,
)

# Set the main objects of the Panelini app
app.main_set(
    objects=[
        pn.Card(
            hide_header=True,
            collapsible=False,
            width=500,
            objects=[chat_interface],
        )
    ]
)

chat_interface.send("Minions Ipsum is simply dummy text of the printing and typesetting industry.")

servable = app.servable()

if __name__ == "__main__":
    # Serve app as you would in panel
    pn.serve(servable, port=5011)
