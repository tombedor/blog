---
title: "MemGPT Meta-Functions"
date: 2024-01-02
---

# MemGPT Meta-Functions

[MemGPT](https://github.com/cpacker/MemGPT) is an interesting project which provides GPT agents with unbounded memory. It includes the ability to incorporate custom functions, with a convenient JSON schema generator.

In trying to extend the agent with functions of my own, I found that the agent was reluctant to give me information about the functions I was making available to it, so I wrote a set of meta-functions which enable the agent to view source code, set debugger lines, and create functions. You can view the source code [here](https://github.com/tombedor/MemGPT-Functions/tree/main/meta_functions). Note that running this requires some edits I made to MemGPT to enable dynamic function reloading ([PR](https://github.com/cpacker/MemGPT/pull/734)).

<!-- truncate -->

### The Good

The agent was able to utilize the `reload_functions`, `introspect_function`, and `list_functions` commands and understand output. The `debugger` function was also helpful in enabling the agent to understand what I was doing - placing debuggers in other functions often resulted in the agent's internal monologue wondering what was going on.

For function creation, at first I tried putting each function in it's own `agent_defined_` prefixed file  (eg `agent_defined_hello_world.py` for a `hello_world` function) , but this quickly became disorganized, especially where import statements were needed.

I edited the function to instead create functions within modules:

```python
def create_function(self, function_name: str, function_code_with_docstring: str, module_name: str) -> str:
    """Creates an agent accessible function in Python. Function MUST include a docstring, and MUST include self as first argument.

    Args:
        function_name (str): The name of the function
        function_code_with_docstring (str): The code of the function, including the docstring
        module_name (str): The name of the module to create the function in

    Raises:
        Exception: Exception if the function already exists
        Exception: Exception if the function does not start with def function_name(self, ...
        Exception: Exception if the function does not include a docstring.
        Exception: Exception if the function is not in the functions directory.

    Returns:
        str: The result of the function creation attempt.
    """

    # setup
    if not os.path.exists(FUNCTIONS_DIR):
        os.makedirs(FUNCTIONS_DIR)

    # Make sure that if the function is already defined, overwrite = true and it is an agent defined function
    if function_name in self.functions_python.keys():
        raise Exception(f"Function {function_name} already exists. To overwrite, first delete with the delete_function function.")


    if not function_code_with_docstring.split("\n")[0].strip().startswith('def ' + function_name + '(self'):
        raise Exception("Function must start with def " + function_name + "(self, ...")

    if '"""' not in function_code_with_docstring and "'''" not in function_code_with_docstring:
        raise Exception("Function code must have a docstring.")

    file_path = os.path.join(FUNCTIONS_DIR, module_name + ".py")

    if os.path.exists(file_path):
        with open(file_path, "r") as f:
            previous_source = f.read()
    else:
        previous_source = ""

    # write new module:
    with open(os.path.join(file_path), "w") as f:
        f.write(previous_source + "\n\n" + function_code_with_docstring)

    self.reload_functions()
    return f"added function {function_name} to file {file_path}"
```

This worked reasonably well. Having the function return a string was helpful in letting the agent known what was changed.

### Problems
The agent had a difficult time consistently authoring functions that conformed to MemGPT's requirements - that it has a docstring, type hints, and only int, str, and bool return and argument types.

The iteration on basic requirements made it difficult for the agent to compose functions that worked together well. Often it would author placeholder functions that had names that sounded right, but didn't really do anything.

As the number of functions grew, so did the agent's tendency to get them confused. Functions also consume context window space, so making a large library of functions to any particular agent doesn't see promising.


### Next steps
This experiment points me back to a multi-agent approach in creating a broadly capable personal assistant. Having narrowly scoped helper agents available to the primary agent seems like the most promising route.

As I want to push a deployment of MemGPT to a server anyway, I am going to try to have a deployment with multiple agents that can talk to each other.

This is similar to Autogen's approach, though I think Autogen's groupchat management is too primitive to be useful.
