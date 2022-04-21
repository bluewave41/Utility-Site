const checkParameters = (req, expectedProperties: string[]) => {
    for(var x=0;x<expectedProperties.length;x++) {
        let property = expectedProperties[x]
        if(!req.body[property]) {
            throw new Error(`Missing ${property} parameter.`);
        }
    }
}

export { checkParameters }