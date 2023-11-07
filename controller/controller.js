const Question = require('../models/question');
const Option = require('../models/option');

// Function to create a new question
module.exports.newQuestion = async (req, res) => {
    try {
        const { title } = req.body;
        const question = await Question.create({ title: title });

        if (question) {
            res.status(201).send(question);
        } else {
            res.status(500).json({
                message: "Question not created",
                data: []
            });
        }
    } catch (error) {
        console.log("Error in new question creation: ", error);
        res.status(500).json({
            message: "Server error",
            data: []
        });
    }
};

// Function to create a new option for an existing question
module.exports.createOption = async (req, res) => {
    const questionId = req.params.id;

    try {
        const { option } = req.body;

        // Create the new option
        const newOption = await Option.create({ option: option, question: questionId });
         if(newOption){
            const addVoteLink = await Option.findByIdAndUpdate({_id:newOption._id} ,{$set: {link_to_vote: `http://localhost:7000/options/${newOption._id}/add_vote`}})
         }
        if (newOption) {
            const updatedQuestion = await Question.findByIdAndUpdate(
                questionId,
                {
                    $push: { option: newOption._id },
                   
                },
                { new: true }
            )

            res.send(updatedQuestion);
        } else {
            res.status(500).json({
                message: "Option not created",
                data: []
            });
        }

    } catch (error) {
        console.log("Error in creating option: ", error);
        res.status(500).json({
            message: "Server error",
            data: []
        });
    }
};


//Function to view Quetion with existing option
module.exports.viewQuestionsAndOptions = async(req,res)=>{
   const questionId = req.params.id;
    try {

       if(questionId){
        const questionwithOption = await Question.findById({_id:questionId}).populate('option');

        if(questionwithOption){
            res.status(201).send(questionwithOption)
        }else{
            res.status(404).json({
                message:"something wrong",
                data:[]
            })
        }
       }else{
       res.status(404).json({
        message:"Question not found",
        data:[]
       })}
        
    } catch (error) {
        console.log("Error in view question with option: ", error);
        res.status(500).json({
            message: "Server error",
            data: []
        });
    }
}


//Function to add to vote in existing option 
module.exports.addVote = async(req,res)=>{

    const optionId = req.params.id;

    try {

        if(optionId){
            const updatedOption=await Option.findByIdAndUpdate({_id:optionId},{$inc:{vote:1}} ,{new:true} )
            console.log(updatedOption)
            if(updatedOption){
                res.status(201).send(updatedOption);
            }else{
                res.status(404).json({
                    message:"Vote not count",
                    data:[]
                })
            }

        }else{
            res.status(404).json({
                message:"Option not found",
                data:[]
            })
        }

        
    } catch (error) {
        console.log("Error in add vote : ", error);
        res.status(500).json({
            message: "Server error",
            data: []
        });
    }
}


//Function to delete the existing question 
module.exports.deleteQuestion = async(req,res)=>{
       const questionId = req.params.id;
    try {
        if(questionId){
            const questionDelete = await Question.findByIdAndDelete({_id:questionId});
            if(questionDelete){
                res.status(201).json({
                    message:"This Question Deleted Successfully",
                    data : [questionDelete]
                })
            }else{
                res.status(201).json({
                    message:"Something wrong",
                    data : []
                })
            }
        }else{
            res.status(401).json({
                message:"Question not found",
                data : []
            })
        }
        
    } catch (error) {
        console.log("Error in deleting question: ", error);
        res.status(500).json({
            message: "Server error",
            data: []
        });
    }
}

//Function to delete the existing option
module.exports.deleteOption = async(req,res)=>{
    const optionId = req.params.id;
    try {
        if(optionId){
            const optionDelete = await Option.findByIdAndDelete({_id:optionId});
            if(optionDelete){
                res.status(201).json({
                    message:"This Option Deleted Successfully",
                    data : [optionDelete]
                })
            }else{
                res.status(201).json({
                    message:"Something wrong",
                    data : []
                })
            }
        }else{
            res.status(401).json({
                message:"Option not found",
                data : []
            })
        }
        
    } catch (error) {
        console.log("Error in Deleting option: ", error);
        res.status(500).json({
            message: "Server error",
            data: []
        });
    }
}