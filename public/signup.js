$(()=>{
    $('.doc').hide()
    $('#type').change(()=>{
        if($('#type').val()=='doctor')
        { $('.doc').show()
            console.log('hello')
    }
})
})