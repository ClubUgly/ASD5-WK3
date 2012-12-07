function(doc) {
  if (doc._id.substr(0, 6)==="contact" {
    emit(doc._id,{
     	"fname":doc.fname,
     	"email":doc.email,
     	"url":doc.url,
    	"sex":doc.sex,
     	"borndate":doc.borndate,
     	"groups":doc.groups,
     	"quantity":doc.quantity,
     	"comments":doc.comments,
     	"terms":doc.terms,
    }    	
    
    );
  }
};