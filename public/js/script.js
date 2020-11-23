//frontend validation
//=====================================================================================

var pass = document.getElementById('pass')
var rptPass = document.getElementById('rpt-pass')

    rptPass.addEventListener('input', function (event) {
        if (rptPass.value !== pass.value) {
            rptPass.setCustomValidity(
                'This should be same as the last password you entered'
            )
        } else {
            rptPass.setCustomValidity('')
        }
    })
    pass.addEventListener('input', function (event) {
    if (pass.value.length < 6 || pass.value.length > 10) {
        pass.setCustomValidity(
            'Password length should lie between 6 to 10 characters'
        )
    } else {
        pass.setCustomValidity('')
    }
})
//=========================================================================================