# https://figurl.org/f?v=gs://figurl/jfm-1&d=sha1://302c7edcafb5e23795eeccd7b2d2d90f800251f6&label=mandelbrot%20demo

import figurl as fig


def main():
    dd = {
        'type': 'jfm.Mandelbrot'
    }
    F = fig.Figure(data=dd, view_url='gs://figurl/jfm-1')
    print(F.url(label='mandelbrot demo'))

if __name__ == '__main__':
    main()
