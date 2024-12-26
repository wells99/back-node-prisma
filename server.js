import express, { request, response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()

app.use(express.json())


 app.post('/usuarios',async (req, res) => {
     console.log(req.body);

   try {
     await prisma.user.create({
          data:{
               email: req.body.email,
               name: req.body.name,
               cpf: req.body.cpf,
               adressname: req.body.adressname,
               phone: req.body.phone
          }
     })
     res.status(201).json(req.body)
     console.log(res);
   } catch (error) {
     console.log(error);
     return  res.status(400).json({ERRO:`: ${error.meta.target} já cadastrado`});
   }
     
})


app.get('/usuarios', async (req, res) => {

      let users = []

     try {
          if (req.query) {
          
               users = await prisma.user.findMany({
                   where:{
                        email: req.body.email,
                        name: req.body.name,
                        cpf: req.body.cpf,
                        adressname: req.body.adressname,
                        phone: req.body.phone
                   }
              })
         } else {
               users = await prisma.user.findMany()
         }
     } catch (error) {
          console.log(error);
          return  res.json({ERRO:`: ${error}`});
     }


     res.status(200).json(users)
    
     

})


app.put('/usuarios/:id',async (req, res) => {
     console.log(req.body);


     try {
          await prisma.user.update({
               where:{
                    id:req.params.id
               },  
               data:{
                    email: req.body.email,
                    name: req.body.name,
                    cpf: req.body.cpf,
                    adressname: req.body.adressname,
                    phone: req.body.phone
                    }
               })
               res.status(201).json(req.body)
     } catch (error) {
          console.log(error);
          return  res.json({ERRO:`- CODE: ${error.code} -> ${error.meta.cause}`});
     }

   
})

app.delete('/usuarios/:id', async (req,res) => {
     
     try {
          await prisma.user.delete({
               where:{
                    id:req.params.id
               }
     
          })
          res.status(200).json({message:"SUCESSO: Usuário Deletado!!"})
     } catch (error) {
          console.log(error);
          return  res.json({ERRO:`- CODE: ${error.code} -> ${error.meta.cause}`});
     }

})

const PORT = process.env.PORT

app.listen(3000, () => {
     console.log("Servidor - Online na porta: " + PORT);
})