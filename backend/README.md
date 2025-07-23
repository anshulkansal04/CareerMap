# ⚙️ Future Fit Backend

> Node.js/Express.js backend API with Python ML services for the CareerMap - NEP Future Fit Platform

## 📋 Overview

The backend provides a robust REST API built with Node.js and Express.js, handling user authentication, data management, and integration with MongoDB. It also includes Python/Flask services for machine learning-based college predictions and scholarship recommendations.

## 🛠️ Technology Stack

### **Node.js Backend**
- **Runtime**: Node.js with Express.js 4.21.1
- **Database**: MongoDB with Mongoose ODM 8.8.1
- **Authentication**: JWT (jsonwebtoken 9.0.2)
- **Security**: bcryptjs 2.4.3 for password hashing
- **Middleware**: CORS 2.8.5, express-async-handler 1.2.0
- **Environment**: dotenv 16.4.5 for configuration
- **Development**: nodemon 3.1.7 for auto-restart

### **Python ML Services**
- **Framework**: Flask with Flask-CORS
- **Data Processing**: Pandas for data manipulation and analysis
- **Machine Learning**: Scikit-learn for predictive models
- **Web Scraping**: Google Search Python 1.1.0 for scholarship data
- **Browser Automation**: Playwright (commented, available for future use)

## 📁 Project Structure

```
backend/
├── server.js                    # Main Express server
├── app.py                      # Python Flask ML service
├── package.json                # Node.js dependencies
├── requirements.txt            # Python dependencies
├── college_cutoff.csv          # College cutoff data
├── college.csv                 # College information database
├── Cutoff_ML.ipynb            # ML model development notebook
├── filtered_engineering_colleges.csv  # Engineering colleges data
├── filtered.csv               # Filtered dataset
├── scholar.py                 # Scholarship scraping service
├── config/
│   └── db.js                  # MongoDB connection configuration
├── controllers/               # Request handlers
│   ├── EducationDetailsController.js
│   ├── ExtraDetailsController.js
│   ├── GetEducationDetailsController.js
│   ├── GetExtraDetailsInfo.js
│   ├── GetPersonalInfo.js
│   ├── PersonalController.js
│   └── userController.js
├── middleware/                # Custom middleware
│   ├── authMiddleware.js      # JWT authentication
│   └── errorMiddleware.js     # Error handling
├── models/                    # Database schemas
│   ├── EducationDetailsModel.js
│   ├── ExtraDetailsModel.js
│   ├── PersonalModel.js
│   └── userModel.js
└── routes/                    # API route definitions
    └── UserRoutes.js
```

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v14.0.0 or later)
- Python (v3.8 or later)
- MongoDB (v4.4 or later)
- npm or yarn package manager

### **Installation**

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install Node.js dependencies**
   ```bash
   npm install
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

### **Running the Services**

#### **Start MongoDB**
```bash
# Using MongoDB service
sudo systemctl start mongod

# Or using MongoDB directly
mongod --dbpath /path/to/your/db
```

#### **Start Node.js Server**
```bash
# Development mode with auto-restart
npm run server

# Production mode
npm start
```

#### **Start Python ML Service**
```bash
# Run Flask application
python app.py
```

### **Available Scripts**

```bash
# Start production server
npm start

# Start development server with nodemon
npm run server

# Run tests
npm test
```

## 🔧 Configuration

### **Environment Variables**
Create a `.env` file in the backend directory:

```env
# Database Configuration
MONGO_URI=mongodb://localhost:27017/careermap
DB_NAME=careermap

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_complex
JWT_EXPIRE=30d

# Server Configuration
NODE_ENV=development
PORT=5000

# Python ML Service
PYTHON_ML_PORT=4000
PYTHON_ML_URL=http://localhost:4000

# CORS Configuration
CLIENT_URL=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# Security
BCRYPT_SALT_ROUNDS=12

# Database Options
DB_MAX_POOL_SIZE=10
DB_SERVER_SELECTION_TIMEOUT=5000
```

## 📊 Database Schema

### **User Model (`userModel.js`)**
```javascript
{
  _id: ObjectId,
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['student', 'counselor', 'admin'],
    default: 'student'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

### **Personal Information Model (`PersonalModel.js`)**
```javascript
{
  _id: ObjectId,
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\+?[\d\s-()]+$/.test(v);
      }
    }
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  parentInfo: {
    fatherName: String,
    motherName: String,
    guardianPhone: String,
    occupation: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

### **Education Details Model (`EducationDetailsModel.js`)**
```javascript
{
  _id: ObjectId,
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  academicYear: {
    type: String,
    required: true
  },
  class: {
    type: String,
    enum: ['9', '10', '11', '12'],
    required: true
  },
  board: {
    type: String,
    enum: ['CBSE', 'ICSE', 'State Board', 'IB', 'Other'],
    required: true
  },
  subjects: [{
    name: {
      type: String,
      required: true
    },
    marksObtained: {
      type: Number,
      required: true,
      min: 0
    },
    totalMarks: {
      type: Number,
      required: true,
      min: 1
    },
    grade: String
  }],
  overallPercentage: {
    type: Number,
    min: 0,
    max: 100
  },
  rank: Number,
  achievements: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

### **Extra Details Model (`ExtraDetailsModel.js`)**
```javascript
{
  _id: ObjectId,
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  hobbies: [String],
  skills: [String],
  languages: [{
    name: String,
    proficiency: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Native']
    }
  }],
  extracurricularActivities: [{
    activity: String,
    role: String,
    duration: String,
    achievements: [String]
  }],
  careerInterests: [String],
  preferredColleges: [String],
  preferredCourses: [String],
  competitiveExams: [{
    examName: String,
    score: Number,
    rank: Number,
    year: Number
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

## 🛣️ API Endpoints

### **Authentication Routes**
```javascript
// Register new user
POST /api/users/register
{
  "name": "Student Name",
  "email": "student@example.com",
  "password": "securePassword123"
}

// User login
POST /api/users/login
{
  "email": "student@example.com",
  "password": "securePassword123"
}

// Get user profile (Protected)
GET /api/users/profile
Headers: { Authorization: "Bearer <jwt_token>" }
```

### **Personal Information Routes**
```javascript
// Create/Update personal information
POST /api/users/personal
Headers: { Authorization: "Bearer <jwt_token>" }
{
  "fullName": "John Doe",
  "dateOfBirth": "2005-06-15",
  "gender": "male",
  "phone": "+91-9876543210",
  "address": {
    "street": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zipCode": "400001",
    "country": "India"
  }
}

// Get personal information
GET /api/users/getpersonal
Headers: { Authorization: "Bearer <jwt_token>" }
```

### **Education Details Routes**
```javascript
// Submit education details
POST /api/users/education
Headers: { Authorization: "Bearer <jwt_token>" }
{
  "academicYear": "2023-2024",
  "class": "12",
  "board": "CBSE",
  "subjects": [
    {
      "name": "Physics",
      "marksObtained": 85,
      "totalMarks": 100,
      "grade": "A"
    },
    {
      "name": "Chemistry",
      "marksObtained": 78,
      "totalMarks": 100,
      "grade": "B+"
    }
  ],
  "overallPercentage": 81.5
}

// Get education records
GET /api/users/geteducation
Headers: { Authorization: "Bearer <jwt_token>" }
```

### **Extra Details Routes**
```javascript
// Submit extra details
POST /api/users/extra
Headers: { Authorization: "Bearer <jwt_token>" }
{
  "hobbies": ["Reading", "Swimming", "Chess"],
  "skills": ["Python Programming", "Data Analysis", "Public Speaking"],
  "careerInterests": ["Computer Science", "Data Science", "AI/ML"],
  "competitiveExams": [
    {
      "examName": "JEE Main",
      "score": 250,
      "rank": 15000,
      "year": 2024
    }
  ]
}

// Get extra details
GET /api/users/getextra
Headers: { Authorization: "Bearer <jwt_token>" }
```

## 🤖 Python ML Services

### **College Prediction API (`app.py`)**
```python
# Predict colleges based on JEE rank
POST http://localhost:4000/api/colleges
{
  "rank": 15000,
  "category": "General",
  "state": "Maharashtra",
  "preferences": ["Computer Science", "Electronics"]
}

Response:
{
  "predictions": [
    {
      "college_name": "IIT Mumbai",
      "branch": "Computer Science",
      "probability": 0.75,
      "cutoff_rank": 12000,
      "fees": 200000
    }
  ]
}
```

### **Scholarship Scraping Service (`scholar.py`)**
```python
# Get scholarship recommendations
GET http://localhost:4000/api/scholarships?category=merit&level=undergraduate

Response:
{
  "scholarships": [
    {
      "name": "Merit Scholarship 2024",
      "provider": "Government of India",
      "amount": 50000,
      "eligibility": "Minimum 85% in 12th",
      "deadline": "2024-03-15",
      "application_link": "https://..."
    }
  ]
}
```

## 🔒 Security Features

### **Authentication Middleware (`authMiddleware.js`)**
```javascript
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && 
      req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});
```

### **Password Security**
- Passwords hashed using bcryptjs with salt rounds
- Minimum password length enforcement
- Password complexity validation
- Secure password reset functionality

### **CORS Configuration**
```javascript
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS.split(','),
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
```

## 📈 Performance Optimization

### **Database Optimization**
- MongoDB indexing on frequently queried fields
- Connection pooling for efficient resource usage
- Query optimization with proper field selection
- Aggregation pipelines for complex data processing

### **Caching Strategy**
- In-memory caching for frequently accessed data
- Redis integration for session management (planned)
- Database query result caching
- Static asset caching headers

### **API Rate Limiting**
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});

app.use('/api/', limiter);
```

## 🧪 Testing

### **Test Structure**
```bash
backend/
├── __tests__/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── middleware/
├── jest.config.js
└── test-setup.js
```

### **Running Tests**
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- controllers/userController.test.js
```

### **Test Examples**
```javascript
// Example test for user registration
describe('User Registration', () => {
  test('should register a new user', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    };

    const response = await request(app)
      .post('/api/users/register')
      .send(userData)
      .expect(201);

    expect(response.body).toHaveProperty('token');
    expect(response.body.user.email).toBe(userData.email);
  });
});
```

## 📊 Monitoring & Logging

### **Error Handling Middleware**
```javascript
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};
```

### **Request Logging**
```javascript
const morgan = require('morgan');

// Custom token for user ID
morgan.token('user', (req) => {
  return req.user ? req.user._id : 'anonymous';
});

app.use(morgan(':method :url :status :response-time ms - user: :user'));
```

## 🚀 Deployment

### **Production Build**
```bash
# Install production dependencies only
npm ci --only=production

# Set environment variables
export NODE_ENV=production
export PORT=5000

# Start production server
npm start
```

### **Docker Configuration**
```dockerfile
# Dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

### **Environment-specific Configurations**
```javascript
// config/database.js
const config = {
  development: {
    mongodb: {
      uri: process.env.MONGO_URI || 'mongodb://localhost:27017/careermap_dev',
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    }
  },
  production: {
    mongodb: {
      uri: process.env.MONGO_URI,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        ssl: true,
        sslValidate: true
      }
    }
  }
};
```

## 🔮 Future Enhancements

- [ ] **GraphQL API** - More flexible data querying
- [ ] **Real-time Features** - WebSocket integration for live updates
- [ ] **Microservices Architecture** - Service decomposition for scalability
- [ ] **Advanced ML Models** - More sophisticated prediction algorithms
- [ ] **API Versioning** - Backward compatibility management
- [ ] **Advanced Analytics** - User behavior tracking and insights
- [ ] **Push Notifications** - Mobile and web push notifications
- [ ] **Caching Layer** - Redis integration for improved performance

## 🐛 Troubleshooting

### **Common Issues**

#### **MongoDB Connection Failed**
```bash
# Check MongoDB service status
sudo systemctl status mongod

# Restart MongoDB
sudo systemctl restart mongod

# Check connection string in .env
MONGO_URI=mongodb://localhost:27017/careermap
```

#### **JWT Token Issues**
```bash
# Verify JWT_SECRET is set
echo $JWT_SECRET

# Check token expiration
# Default is 30 days, adjust in .env if needed
JWT_EXPIRE=30d
```

#### **Python Service Not Starting**
```bash
# Check Python version
python --version

# Install missing dependencies
pip install -r requirements.txt

# Check Flask app startup
python app.py
```

#### **CORS Errors**
```javascript
// Verify CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true
};
```

---

<div align="center">
  <strong>Backend API built with Node.js, Express, and Python ML services</strong>
</div>
