const AppError = require('../utils/appError');
const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');

//MIDDLEWARE (manipulating req.query)
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage.price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTours = catchAsync(async (req, res) => {
 
    //EXECUTE QUERY
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

    res.status(200).json({
      status: 'success',
      length: tours.length,
      data: {
        tours,
      },
    });
 
});

exports.getTour = catchAsync(async (req, res, next) => {
  
    const tour = await Tour.findById(req.params.id);
    
    if(!tour) {
     return next(new AppError("No tour found with that ID", 404))
    }

    res.status(200).json({
      status: 'success',
      data: { tour },
    });
 
});



exports.createTour = catchAsync(async (req, res, next) => {
  // const newTour = new Tour()
  // newTour.save()

  const newTour = await Tour.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
});

exports.updateTour = catchAsync( async (req, res, next) => {
  
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if(!tour) {
      return next(new AppError("No tour found with that ID", 404))
     }

    res.status(200).json({
      status: 'success',
      tour,
    });
 
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  
  const tour =   await Tour.findByIdAndDelete(req.params.id);

    if(!tour) {
      return next(new AppError("No tour found with that ID", 404))
     }

    res.status(204).json({
      status: 'success',
      data: null,
    });
 
});
