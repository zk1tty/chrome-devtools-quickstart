export function setupCounter(element) {
  let counter = 0
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)

  const registration = navigator.modelContext.registerTool({
  name: "get_page_title",
  description: "Get current page title",
  inputSchema: { type: "object", properties: {} },
  async execute() {
    return {
      content: [{ type: "text", text: document.title }]
    };
  }
});
    
navigator.modelContext.registerTool({
  name: 'get_counter',
  description: 'This will return the current value of the counter, call this before setting the counter',
  inputSchema: {
        type: 'object',
        properties: {}
  },
  async execute(args) {
    return {
      content: 
        [{type: 'text', text: `the current counter value is ${counter}`}]
    }
  }
});

navigator.modelContext.registerTool({
  name: 'set_counter',
  description: 'This will set the counter to the desired value',
  inputSchema: {
    type: 'object',
    properties: {
      newCounterValue: { type: 'number', description: 'The number you want to set the counter to' }
    },
    required: ['newCounterValue']
  },
  async execute(args) {
    const newValue = args.newCounterValue
    setCounter(newValue)
    return {
      content: [{ type: 'text', text: 'counter is now ' + args.newCounterValue }]
    };
  }
})

}