module.exports = async (msg, prompt, reactions, user, time, collectFunction, endFunction) => {
  let promptMessage = await msg.channel.send(prompt);
  
  reactions.forEach((reaction, i) => {
    if (i === reactions.length - 1) {
      return promptMessage.react(reaction)
        .then(() => {
          const filter = (_reaction, _user) => _user.id === user.id; 
          const collector = promptMessage.createReactionCollector(filter, { time: time, max: 1 });
          collector.on("collect", collectFunction);
          if (endFunction) {
            collector.on("end", endFunction)
          }
        });
    }

    promptMessage.react(reaction);
  });
}