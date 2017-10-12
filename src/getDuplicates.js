function asUaid({ time, type, device }) {
  return `${time}/${device}/${type}`;
}

function getDuplicates(messages) {
  const counts = messages.reduce((c, m) => Object.assign({}, c, {
    [asUaid(m)]: {
      messages: (c[asUaid(m)] || { messages: [] }).messages.concat(m),
      count: (c[asUaid(m)] || { count: 0 }).count + 1,
    },
  }), {});
  const duplicates = Object.values(counts).filter(({ count }) => count > 1);
  return duplicates;
}

module.exports = getDuplicates;
