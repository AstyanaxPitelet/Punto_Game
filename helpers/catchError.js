const catchError = err => {
    if(err.name === 'ValidationError') {
        let errors = {}
        Object.keys(err.errors).forEach((key) => {
            errors[key] = err.errors[key].message 
        })
        return errors
    }
}