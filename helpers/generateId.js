const generateId = async () => {
    const { nanoid } = await import('nanoid');

    return nanoid();
};

module.exports = generateId;
