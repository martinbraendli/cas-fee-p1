/*
 * Theme Chooser triggered on change of option tag
 */
$("#ThemeChooser")
    .change(function () {
        // empty var string
        var str = "";
        $("select option:selected").each(function () {
            // fill string with variable of VALUE of selected option
            str += $(this).val() + " ";
        });
        // adress ID link-Css and change attribut href with string
        $("#themeCss").attr('href', str);
        console.log(str);
    })
    // trigger this on change of option
    .trigger("change");