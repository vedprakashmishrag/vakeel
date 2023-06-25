const services = (req, res) => {
    res.render('services.ejs', {
        title: 'Resume World: all services',
        page_name: 'Services',
        message: 'error'
    });
};
export default services;
