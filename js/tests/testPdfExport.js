/**
 * Created by ninjatrappeur on 15/02/16.
 */
var expect = chai.expect;

var testText = "Another hope\n" +
    "\n"+
    "\n" +
    "<p>\n"+
    "A minimalist writing zone, where you can block out all distractions and get to what's important. The writing!\n" +
    "</p>\n"+
    "\n"+
    "<p>\n"+
    "To get started, all you need to do is delete this text (seriously, just highlight it and hit delete), and fill the page with your own fantastic words. You can even change the title!\n"+
    "</p>\n"+
    "\n"+
    "<p>\n"+
    "You can use <b>bold</b>, <i>italics</i>, <b><i>both</i></b> and <a href=\"http://zenpen.io\"> urls </a> just by highlighting the text and selecting them from the tiny options box that appears above it.\n" +
    "</p>\n"+
    "\n"+
    "<blockquote>\n"+
    "Quotes are easy to add too!\n"+
    "</blockquote>\n"+
    "\n"+
    "<p>\n"+
    "For <i>questions</i> and <b>open source info</b>, Click that little question mark at the bottom left of the screen.</p>\n"+
    "\n"+
    "\n";
describe('File export should provide', function() {
    describe('PDF export which is constituted by', function () {

        describe('transformToPDFReadyJSON', function () {
            it('should return an object containing the title.', function () {
                var text = ZenPen.ui.api.__testonly__.transformToPDFReadyJSON("Another hope\n");
                expect(text).to.deep.equal({content: [{text:'Another hope'}]});
            });
            it('should return an object of correctly separated paragraphs.', function () {
                chai.config.includeStack = true;
                var input = "<p>first</p><p>second</p>";
                var expectedResult = {content: [{text:'first'}, {text:'second'}]};
                var output = ZenPen.ui.api.__testonly__.transformToPDFReadyJSON(input);
                expect(output).to.deep.equal(expectedResult);
            });
            it('should return an object of correctly formatted bold test', function(){
                var input = "<p>A line with <b>some bold text</b> and some more after</p>";
                var expectedResult = {content: [{text:[{text:'A line with '},{text:'some bold text',style:'bold'},{text:' and some more after'}]}]};
                var output = ZenPen.ui.api.__testonly__.transformToPDFReadyJSON(input);
                expect(output).to.deep.equal(expectedResult);
            });
            it('should return an object of correctly formatted italic test', function(){
                var input = "A line with <i>some italic text</i> and some more after";
                var expectedResult = {content: [{text:[{text:'A line with '},{text:'some italic text',style:'italic'},{text:' and some more after'}]}]};
                var output = ZenPen.ui.api.__testonly__.transformToPDFReadyJSON(input);
                expect(output).to.deep.equal(expectedResult);
            });
            it('should be able to parse a mix of paragraph with italic and bold text', function(){
                var input = "<p>A first paragraph</p><p>A line with <i>some italic text</i> and some more after</p>";
                var expectedResult = {content: [{text:'A first paragraph'}, {text:[{text:'A line with '},{text:'some italic text', style:'italic'},{text:' and some more after'}]}]};
                var output = ZenPen.ui.api.__testonly__.transformToPDFReadyJSON(input);
                expect(output).to.deep.equal(expectedResult);
            });
        });
        describe('Format bold text', function () {
            it('should format a simple bold string', function () {
                //GIVEN
                var inputString = "<b>bold</b>";
                //WHEN
                var formattedBoldString = ZenPen.ui.api.__testonly__.formatInlineTags(inputString, 'b', 'bold');
                //THEN
                expect(formattedBoldString).to.deep.equal([{text: 'bold', style: 'bold'}]);
            });
            it('should format a mixed string', function () {
                //GIVEN
                var inputString = 'not bold<b>bold</b>not bold';
                //WHEN
                var output = ZenPen.ui.api.__testonly__.formatInlineTags(inputString, 'b', 'bold');
                //THEN
                var expectedResult = [{text: 'not bold'}, {text: 'bold', style: 'bold'}, {text: 'not bold'}];
                expect(output).to.deep.equal(expectedResult);
            });
        });
        describe('Format italic text', function () {
            it('should format a simple italic string', function () {
                //GIVEN
                var inputString = '<i>italic</i>';
                //WHEN
                var output = ZenPen.ui.api.__testonly__.formatInlineTags(inputString, 'i', 'italic');
                //THEN
                var expectedResult = [{text: 'italic', style: 'italic'}];
                expect(output).to.deep.equal(expectedResult);
            });
            it('should format a mixed string', function () {
                //GIVEN
                var inputString = 'not italic<i>italic</i>not italic';
                //WHEN
                var output = ZenPen.ui.api.__testonly__.formatInlineTags(inputString, 'i', 'italic');
                //THEN
                var expectedResult = [{text: 'not italic'}, {text: 'italic', style: 'italic'}, {text: 'not italic'}];
                expect(output).to.deep.equal(expectedResult);
            });
        });
        describe('Format block quote', function(){
            it('should format as a block quote', function(){
                //GIVEN
                var inputString = 'blockquote test';
                //WHEN
                var output = ZenPen.ui.api.__testonly__.formatBlockQuote(inputString);
                //THEN
                var expectedResult = {text:'blockquote test', style:'blockquote'};
                expect(output).to.deep.equal(expectedResult);
            });
        });
    });
});