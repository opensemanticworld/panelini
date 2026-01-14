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

LLM = AzureChatOpenAI(
    azure_endpoint=os.environ.get("AZURE_OPENAI_ENDPOINT"),
    api_version=os.environ.get("AZURE_OPENAI_API_VERSION"),
    model="gpt-4o-2024-08-06",
)


class HistoryToolAgent:
    def __init__(self, tools, prompt_template=None):
        """
        a class including necessary functions to orchestrate a llm tool agent with history
        """

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
        self.langchain_agent = create_tool_calling_agent(LLM, tools, self.prompt_template)
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
    # max_width=500,
    user="🧑 User",
    show_avatar=False,
    min_width=330,
    show_send=True,
    min_height=330,
    show_rerun=False,
    show_undo=False,
    show_clear=True,
    show_timestamp=False,
    show_button_name=False,
    show_reaction_icons=False,
    # sizing_mode="stretch_height",
    callback_exception="verbose",
)

# Create an instance of Panelini
app = Panelini(
    title="📊 Welcome to Panelini! 🖥️",
    # main = main_objects # init objects here
)
# Or set objects outside
app.main_set(
    # Use panel components to build your layout
    objects=[
        pn.Card(
            title="Set complete main objects",
            objects=[chat_interface],
            width=400,
            max_height=400,
        )
    ]
)

if __name__ == "__main__":
    # Serve app as you would in panel
    pn.serve(app.servable(), port=5011)
