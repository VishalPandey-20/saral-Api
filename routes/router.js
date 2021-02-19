const express = require("express")
const router = express.Router()
var fs = require("fs");

router.get("/course",(req,res)=>{
    var file = JSON.parse(fs.readFileSync("file.json"))
    res.send(file);
    console.log(file);
})

router.get("/courses",(req,res)=>{
    var file = JSON.parse(fs.readFileSync("file.json"))
    var list = []
    for(var i of file){
        var dict = {
            "id":i.id,
            "name":i.name,
            "description":i.description
        }
        list.push(dict)
    }
    res.send(list);
    console.log(list);

})
router.get("/courses/:id",(req,res)=>{
    var file = JSON.parse(fs.readFileSync("file.json"))
    var list = []
    for (var dic_id of file){
        if(dic_id.id==req.params.id){
            var sho_dic = {
                "id":dic_id.id,
                "name":dic_id.name,
                "description":dic_id.description
            }
            list.push(sho_dic)
        }

    }
    res.send(list);
    console.log(list);
})
router.get("/courses/:id/allexe",(req,res)=>{
    var file = JSON.parse(fs.readFileSync("file.json"))
    var list = []
    for (var exe of file){
        if(exe.id==parseInt(req.params.id)){
            for (var exeo of exe.submission){
                var dict ={
                    "name":exeo.name,
                    "description":exeo.description
                }
                list.push(dict)
            }
        }
    }
    res.send(list);
    console.log(list);
})
router.get("/courses/:id/exe/:ex_id",(req,res)=>{
    var exercise_dic = JSON.parse(fs.readFileSync("file.json"))
    let courseid = req.params.ex_id
    var list = []
    for (var Exercise of exercise_dic){
        if (Exercise.id == parseInt(req.params.id)){
            if(Exercise.id==parseInt(req.params.ex_id)){
                for (var exe of Exercise.submission){
                    delete exe.usersummision
                    list.push(exe)
                }
            }
            // console.log("dfghjk",Exercise.id ,parseInt(courseid));
            
        }
    }
    res.send(list);
    console.log(list);
})


router.get("/courses/:id/exe/:ex_id/ex_sub/:su_id",(req,res)=>{
    var file = JSON.parse(fs.readFileSync("file.json"))
    var list = []
    for (var Exercises of file){
        if (Exercises.id == parseInt(req.params.id)){
            var newlist = []
            for (var exe of Exercises.submission){
                if(exe.courseid==parseInt(req.params.su_id)){
                    var dict = {
                        "name":exe.name,
                        "description":exe.description
                    }
                }
            }
        }

    }
    list.push(dict)
    console.log(list);
    res.send(list);
})
router.get("/courses/:id/user_sub/:su_id",(req,res)=>{
    var file = JSON.parse(fs.readFileSync("file.json"))
    var list =[]
    for (var Exe of file){

        var list1 = []
        if(Exe.id==parseInt(req.params.id)){
            for (var exe of Exe.submission){
                if(exe.courseid==parseInt(req.params.su_id)){
                    for (var user of exe.usersummision){
                        var dict = {
                            "name":user.username,
                            "usersubmissions":user.usersubmissions
                        }
                        list.push(dict)
                    }
                }
            }
        }

    }
    res.send(list);
    console.log(list);
})
router.post("/newCourses",(req,res)=>{
    let file = JSON.parse(fs.readFileSync("file.json"))
    var newdata = {
        "id":req.body.id,
        "name":req.body.name,
        "description":req.body.description,
        "exercise":[]
    }
    file.push(newdata)
    fs.writeFileSync("file.json",JSON.stringify(file))
    res.send(file);
    console.log(newdata);
})
router.put("/update_name_des/:id",(req,res)=>{
    var file = JSON.parse(fs.readFileSync("file.json"))
    for (var dic of file){
        if (dic.id==parseInt(req.params.id)){
            var dic_index = file.indexOf(dic);
            var old_exe = dic.submission 
        }
    }
    var new_dic = {
        "id":req.params.id,
        "name":req.body.name,
        "description":req.body.description,
        "submission":old_exe
    }
    file[dic_index] = new_dic
    fs.writeFileSync("file.json",JSON.stringify(file))
    // return res.send(file);
    file.push(new_dic)
    res.send("Update data successful");
    console.log("Update data successful");
    console.log(new_dic);
})
router.put("/update_exercises/:id/course/:co_id",(req,res)=>{
    var file = JSON.parse(fs.readFileSync("file.json"))


    // let indexOfExersise=req.params.id-1
    // let indexOfCourse=req.params.co_id-1
    // let dic = {
    //             "name":req.body.name,
    //             "description":req.body.description
    //         }
    // file[indexOfExersise].submission[indexOfCourse]=dic

    for (var exe of file){
        if(exe.id==parseInt(req.params.id)){
            for (let sub of exe.submission){
                if(sub.courseid==parseInt(req.params.co_id)){
                    // console.log(sub.name);
                    sub.name=req.body.name
                    sub.description=req.body.description
                }
            
            }
        }
    }
    
    fs.writeFileSync("file.json",JSON.stringify(file))
    res.send(file);
    console.log(file)
})
//add comments
router.post("/update_user/:id/user/:use_id",(req,res)=>{
    var file = JSON.parse(fs.readFileSync("file.json"))
    for (var exe of file){
        if (exe.id==parseInt(req.params.id)){
            for (var user of exe.submission){
                if (user.courseid==parseInt(req.params.use_id)){

                    var username = req.body.username
                    var usersubmissions = [req.body.usersubmissions]
                    var dict = {
                        "id":req.params.id,
                        "course":req.params.use_id,
                        "username":username,
                        "usersubmissions":usersubmissions
                        }
                    user.usersummision.push(dict)
                }
            }
        }
    }
    fs.writeFileSync("file.json",JSON.stringify(file))
    res.send(file);
    console.log(file);
})

//delete for usersummision
router.delete("/cours/:id/courseId/:Id",(req,res)=>{
    var file = JSON.parse(fs.readFileSync("file.json"))
    for (var exe of file){
        if(exe.id==parseInt(req.params.id)){
            for (var sub of exe.submission){
                if(sub.courseid==req.params.Id){
                    let arr= sub.usersummision
                    let index = arr.findIndex(x => x.username ===req.body.username);
                    delete arr[index]
                }
            }
        }
    }
    fs.writeFileSync("file.json",JSON.stringify(file))
    res.send("okk");
    console.log("okk");
})
router.delete("/delcours/:id/coursId/:Id",(req,res)=>{
    var file = JSON.parse(fs.readFileSync("file.json"))
    var count = 0
    for (var i of file){
        if(i.id==parseInt(req.params.id)){
            for (var j of i.submission){
                count++
                if(j.courseid==parseInt(req.params.Id)){
                    delete i.submission[count-1]
                }
            }
        }
    }
    // console.log(file);
    fs.writeFileSync("file.json",JSON.stringify(file))
    res.send("okkk");
    console.log("okk");
})

// delete all content
router.delete("/cours/:id",(req,res)=>{
    var file = JSON.parse(fs.readFileSync("file.json"))
    for (var exe of file){
        if (exe.id==parseInt(req.params.id)){
            // console.log(file.indexOf(exe));
            var index = file.indexOf(exe)
            delete file[index]
        }
    }
    fs.writeFileSync("file.json",JSON.stringify(file))
    res.send("okk");
    console.log("okk");
})
router.delete("/course/:id/submission",(req,res)=>{
    var file = JSON.parse(fs.readFileSync("file.json"))
    var index = req.params.id-1
    delete file[index].submission
    console.log(file);
})

module.exports = router